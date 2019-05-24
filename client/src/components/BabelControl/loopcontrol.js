module.exports = function(babel) {
   var t = babel.types;
   console.log("Entering loopcontrol");
   return {
      visitor: {
         WhileStatement: function transformWhile(path) {
            let variableName = path.scope.generateUidIdentifier("timer");
            let declaration = t.declareVariable(variableName);
            path.scope.parent.push(declaration);
            let definition = t.assignmentExpression(
               "=",
               variableName,
               t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
            );
            path.insertBefore(t.expressionStatement(definition));
            const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(1300)));
            path
               .get("body")
               .pushContainer(
                  "body",
                  t.ifStatement(
                     t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                     t.throwStatement(t.stringLiteral("Execution Timeout. Infinite Loop?")),
                     null
                  )
               );
            },
         DoWhileStatement: function transformDoWhile(path) {
            let variableName = path.scope.generateUidIdentifier("timer");
            let declaration = t.declareVariable(variableName);
            path.scope.parent.push(declaration);
            let definition = t.assignmentExpression(
               "=",
               variableName,
               t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
            );
            path.insertBefore(t.expressionStatement(definition));
            const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(1300)));
            path
               .get("body")
               .pushContainer(
                  "body",
                  t.ifStatement(
                     t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                     t.throwStatement(t.stringLiteral("Execution Timeout. Infinite Loop?")),
                     null
                  )
               );
         },
         ForStatement: function transformFor(path) {
            let variableName = path.scope.generateUidIdentifier("timer");
            let declaration = t.declareVariable(variableName);
            path.scope.parent.push(declaration);
            let definition = t.assignmentExpression(
               "=",
               variableName,
               t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), [])
            );
            path.insertBefore(t.expressionStatement(definition));
            const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(1300)));
            path
               .get("body")
               .pushContainer(
                  "body",
                  t.ifStatement(
                     t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                     t.throwStatement(t.stringLiteral("Execution Timeout. Infinite Loop?")),
                     null
                  )
               );
         }
      }
   };
 };