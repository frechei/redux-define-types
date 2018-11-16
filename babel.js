const babel = require('@babel/types');

module.exports = () => {
    return {
        visitor: {
            VariableDeclaration: {
                enter(path, {opts}) {
                    const file = path && path.hub && path.hub.file;

                    if (!file) {
                        return;
                    }

                    const {sourceFileName, filename} = file.opts;
                    const {filePartner, fileString, typePrefix, typeSuffix} = opts;

                    if (!filename || !sourceFileName) {
                        return;
                    }

                    if (filePartner && !(new RegExp(filePartner)).test(filename)) {
                        return;
                    }

                    if (fileString && filename.indexOf(fileString) === -1) {
                        return;
                    }

                    const initializeValue = path.node.declarations[0].init;

                    if (!babel.isIdentifier(initializeValue)) {
                        return;
                    }

                    if (initializeValue.name === 'ACTION_TYPES' || initializeValue.name === 'ACTION_SINGLE_TYPE') {
                        let {name} = path.node.declarations[0].id;

                        if (typePrefix && name.indexOf(typePrefix) !== 0) {
                            throw path.buildCodeFrameError(`The types ${name} must be begin of ${typePrefix} like: ${typePrefix}${name}`);
                        }

                        if (typeSuffix && name.indexOf(typeSuffix) !== name.length - typeSuffix.length) {
                            throw path.buildCodeFrameError(`The types ${name} must be end of ${typeSuffix} like: ${name}${typeSuffix}`);
                        }

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
