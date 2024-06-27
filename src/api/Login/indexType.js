/**
 * @typedef {Object} _TbLoginRecord
 * @property {string} pkCode - 编码：员工工号，作为主键
 * @property {string} fkCompany - 公司编码：外键，参照 TbCompany 表
 * @property {string} fkDepartment - 所属部门：外键，参照 TbDepartment 表
 * @property {string} fkRole - 角色编码：外键，参照 TbRole 表
 * @property {string} sName - 名称
 * @property {string} sEngName - 英文名
 * @property {string} sPassword - 密码：密码长度不能超过10位
 * @property {boolean} isAdmin - 是否公司管理员：`true` 表示管理员，`false` 表示操作员
 * @property {string} sFaceImg - 人脸识别图片
 * @property {string} sPhone - 手机号
 * @property {string} sJobTitle - 职位名
 * @property {string} sJobNum - 员工工号
 * @property {1 | 2} nGender - 性别：1 代表男，2 代表女
 * @property {boolean} isAccessible - 是否可被访问：`true` 表示可被访问，`false` 表示不可被访问
 * @property {string} sLeaderCode - 直属负责人编码
 * @property {string} sLeader - 直属负责人姓名
 * @property {number} nLevelType - 职位级别
 * @property {string} sCardNo - IC卡号：员工的IC卡号
 * @property {0 | 1} nState - 状态：0 表示禁用（无法登录），1 表示正常
 * @property {string} sEmail - 邮件地址
 * @property {string} sWxOpenId - 微信公众号：用户标识
 * @property {string} sWechatCropId - 企业微信号
 * @property {string} sWechatAppId - 微信小程序号
 * @property {string} sDingUid - 钉钉ID：钉钉用户ID
 * @property {Date} tLogin - 上一次登录时间
 * @property {Date} tUnsealing - 解封时间：如果解封时间大于当前时间，则不能允许登录。超过三次以上登录异常，则封禁半小时。需过了解封时间后才能允许登录，防止暴力破解。
 * @property {Date} tCreate - 创建时间
 */

/** @typedef {import('typeTool').使其他属性变成可null类型<_TbLoginRecord, 'pkCode'>} TbLoginRecord */
export {}
