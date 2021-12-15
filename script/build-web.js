const chalk = require('chalk')
const shell = require('shelljs')

const pLog = (w) => shell.echo(chalk.blue(w))

pLog('entering pica-client')
shell.cd('pica-client')
pLog('in pica-client')
shell.exec('npm run build')

shell.cd('../')
shell.echo(chalk.yellow('BACK ALL DONE!'))
