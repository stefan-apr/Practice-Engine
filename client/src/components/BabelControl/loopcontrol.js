module.exports = function(babel) {

   // TODO: Combine the handlers for While, DoWhile, and For into one handler to improve readability and ensure that the user is covered even if they
   // incorporate multiple kinds of loops in one function. Right now, I'm not sure if that case is handled correctly.

   var t = babel.types;
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
            const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(1600)));
            path
               .get("body")
               .pushContainer(
                  "body",
                  t.ifStatement(
                     t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                     t.throwStatement(t.stringLiteral("Execution Timeout. Infinite While Loop?")),
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
            const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(1600)));
            path
               .get("body")
               .pushContainer(
                  "body",
                  t.ifStatement(
                     t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                     t.throwStatement(t.stringLiteral("Execution Timeout. Infinite Do/While Loop?")),
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
            const lhs = t.parenthesizedExpression(t.binaryExpression("+", variableName, t.NumericLiteral(1600)));
            path
               .get("body")
               .pushContainer(
                  "body",
                  t.ifStatement(
                     t.binaryExpression(">", t.callExpression(t.memberExpression(t.identifier("Date"), t.identifier("now")), []), lhs),
                     t.throwStatement(t.stringLiteral("Execution Timeout. Infinite For Loop?")),
                     null
                  )
               );
         }
      }
   };
 };