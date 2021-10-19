// 引入fs模块
let fs = require('fs-extra');

// 配置文件
let configFile = require("./config.json");

try{

    // 多模块循环
    for(let fileConfigItem of configFile.file_config) {

        main(fileConfigItem, configFile.default_replace_char);
    }

}catch(exception) {

    console.log('exception: ', exception);
}



// ------------------方法区------------------


/**
 * 单模块运行入口
 * @param configItem 模块对象
 * @param replaceChar 替换字符
 */
function main(configItem, replaceChar) {
    // 模板文件容器
    let templateFileContainer = [];

    // 构建模板文件容器
    buildTemplateFileContainer(configItem.templatePath, templateFileContainer);

    // 文件替换
    // 拷贝模板文件到新目录
    for (let item of configItem.action) {

        let itemPath = item.path;
        let itemModalName = item.model_name;

        for (let containerItem of templateFileContainer) {

            // 替换模板文件生成新的文件路径并创建
            let toPath = (containerItem.replace(configItem.templatePath, itemPath))
                .replace(replaceChar, itemModalName);

            if (copy(containerItem, toPath)) {

                console.log("文件创建失败：路径-" + toPath);
            } else {

                console.log("文件创建成功！路径-" + toPath);
            }

        }

    }
}


/**
 * 复制文件
 * @param templatePath 模板文件路径
 * @param toPath 新文件保存路径
 * @returns {*}
 */
function copy(templatePath, toPath) {

    return fs.copy(templatePath, toPath, function(err) {
        return err;
    });
}


/**
 * 构建模板文件容器
 * @param templatePath 模板文件存放路径
 * @param templateFileContainer 容器
 */
function buildTemplateFileContainer(templatePath, templateFileContainer) {

    let files = fs.readdirSync(templatePath);
    for (let fileItem of files) {

        // 单文件路径
        let singleFilepath = templatePath  + "/" + fileItem;

        // 文件对象
        let stat = fs.lstatSync(singleFilepath);

        // 是文件
        if (stat.isFile()) {

            // 往容器中添加模板文件
            templateFileContainer.push(singleFilepath);

        }

        // 是文件夹
        if (stat.isDirectory()) {

            // 递归获取深层文件
            buildTemplateFileContainer(singleFilepath, templateFileContainer);
        }
    }
}