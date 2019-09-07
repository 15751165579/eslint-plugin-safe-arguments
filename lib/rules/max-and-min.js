'use strict';

/**
 * 判断节点属性的名称是否有效
 * 
 * @param {Object} node 节点对象
 * @param {String} property 属性名
 * @param {String} name 属性值
 */
const validByPropertyName = (node, property, name) => {
  if (node[property] && node[property].name === name) {
    return true;
  }
  return false;
}

/**
 * 输出错误信息
 * 
 * @param {Object} context 编译上下文
 * @param {Object} node 节点对象
 */
const report = (context, node) => context.report(node, 'Math.max or Math.min at least two parameters');

/**
 * 找到成员表达式节点对象
 * 
 * @param {Object} node 节点对象 
 */
const findMemberExpression = node => {
  if (node && node.callee) {
    return node.callee;
  }
  return null;
}

/**
 * 是否为 Math 对象
 * 
 * @param {Object} node 节点对象 
 */
const isMathObject = node => validByPropertyName(node, 'object', 'Math');

/**
 * 是否为 Math.max
 * 
 * @param {Object} node 对象节点 
 */
const isMathMethodMax = node => isMathObject(node) && validByPropertyName(node, 'property', 'max');

/**
 * 是否为 Math.min
 * 
 * @param {Object} node 对象节点 
 */
const isMathMethodMin = node => isMathObject(node) && validByPropertyName(node, 'property', 'min');

/**
 * 复杂情况下判断当前节点是否为 Math.max 或者是 Math.min
 * 
 * @param {object} node 节点对象
 */
const isMathMaxOrMin = node => {
  let memberExpression = node;
  while (memberExpression.object && memberExpression.object.type === 'MemberExpression') {
    memberExpression = memberExpression.object;
  }
  if (!memberExpression) {
    return false
  }
  if (isMathMethodMax(memberExpression) || isMathMethodMin(memberExpression)) {
    return true;
  }
  return false;
}

/**
 * 是否调用 call 方法
 * 
 * @param {Object} node 对象节点 
 */
const isCall = node => validByPropertyName(node, 'property', 'call');

/**
 * 是否调用 apply 方法
 * 
 * @param {Object} node 对象节点 
 */
const isApply = node => validByPropertyName(node, 'property', 'apply');

/**
 * 获取表达式的参数信息
 * 
 * @param {Object} node 
 */
const getArgs = node => {
  if (node && node.arguments) {
    return node.arguments;
  }
  return null;
}

module.exports = {
  create: function(context) {
    /**
     * 主流程
     * 
     * @param {Object} context 上下文对象
     * @param {Object} node 对象节点 
     */
    const checkMathMaxOrMinSafe = node => {
      const memberExpression = findMemberExpression(node);
      const args = getArgs(node);
      if (!memberExpression || !isMathMaxOrMin(memberExpression)) {
        return;
      }
      if (isCall(memberExpression)) {
        if (args.length < 3) {
          report(context, node);
        }
      } else if (isApply(memberExpression)) {
        if (args[1] && args[1].type === 'ArrayExpression' && args[1].elements.length > 1) {
          return
        }
        report(context, node);
      } else {
        if (args.length < 2) {
          report(context, node);
        }
      }
    }
    return {
      'CallExpression': checkMathMaxOrMinSafe,
    }
  }
}