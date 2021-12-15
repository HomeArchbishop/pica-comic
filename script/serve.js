const chalk = require('chalk')
const shell = require('shelljs')

const pLog = (w) => shell.echo(chalk.blue(w))

pLog('entering pica-server')
shell.cd('pica-server')
pLog('in pica-server')
shell.exec('npm run serve')

shell.cd('../')
shell.echo(chalk.yellow('BACK ALL DONE!'))
