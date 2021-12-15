const chalk = require('chalk')
const shell = require('shelljs')

const pLog = (w) => shell.echo(chalk.blue(w))

pLog('entering pica-server')
shell.cd('pica-server')
pLog('in pica-server')
pLog('installing pica-server')
shell.exec('npm install')
pLog('installed pica-server')

pLog('entering pica-client')
shell.cd('../pica-client')
pLog('in pica-client')
pLog('installing pica-client')
shell.exec('npm install')
pLog('installed pica-client')

shell.cd('../')
shell.echo(chalk.yellow('BACK ALL DONE!'))
