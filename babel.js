const babel = require('@babel/types');

module.exports = (options) => {
    const {filePartner} = options;

    return {
        visitor: {
            VariableDeclaration: {
                enter(path) {
                    const file = path && path.hub && path.hub.file;

                    if (!file) {
                        return;
                    }

                    const {sourceFileName} = file.opts;

                    if (!sourceFileName) {
                        return;
                    }

                    if (filePartner) {
                        if (Object.prototype.toString.call(filePartner) === '[object RegExp]' && !filePartner.test(sourceFileName)) {
                            return;
                        }

                        if (sourceFileName.indexOf(filePartner) === -1) {
                            return;
                        }
                    }

                    const initializeValue = path.node.declarations[0].init;

                    if (!babel.isIdentifier(initializeValue)) {
                        return;
                    }

                    if (initializeValue.name === 'ACTION_TYPES' || initializeValue.name === 'ACTION_SINGLE_TYPE') {
                        let {name} = path.node.declarations[0].id;

                        name = name.toLowerCase().replace(/_/g, ' ');

                        if (initializeValue.name === 'ACTION_TYPES') {
                            path.get('declarations.0.init').replaceWith(
                                babel.objectExpression(
                                    [
                                        'prepare',
                                        'success',
                                        'fail',
                                    ].map((type) => {
                                        return babel.objectProperty(
                                            babel.stringLiteral(type),
                                            babel.stringLiteral(`${name} ${type}`)
                                        );
                                    })
                                )
                            );
                        } else {
                            path.get('declarations.0.init').replaceWith(babel.stringLiteral(name));
                        }
                    }
                },
            },
        },
    };
};
