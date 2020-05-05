const program = require('commander')
const { create, migrate, fresh } = require('./migration')

program.version('1.0.0')

program
    .command('make:migration <tablename>')
    .description('create new migration file')
    .action((tablename) => {
        if (!tablename || tablename === undefined) {
            console.error('please provide table name')
            return
        }
        create(tablename)
    })

program
    .command('migrate')
    .description('migrate tables')
    .action(() => migrate())

program
    .command('db:fresh')
    .description('drop database')
    .action(() => fresh())

program.parse(process.argv)