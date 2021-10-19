# **基于node.js写的一个脚本生成器**

### 一、目录结构
#####  template 模板文件存放目录
#####  config.json 配置文件
#####  index.js 启动文件（核心代码都在里面）
#####  package.json 依赖库


~~~~
config.json 配置解析：

file_config：文件配置项（file_config 为一个数组，数组里的每一个元素都是一个模块）
default_replace_char：默认被替换字符
file_config.templatePath：当前模块对应的模板文件路径
file_config.action：根据当前模块文件，创建新的模块文件的配置项
file_config.action.path：新模块保存路径（绝对路径或相对路径都可）
file_config.action.model_name：新模块文件名（会检索默认被替换字符，替换成新模块的文件名）

