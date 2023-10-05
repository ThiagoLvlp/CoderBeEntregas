import { Command } from 'commander';

const program = new Command(); 

program 
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del server',8080)
    .option('--mode <mode>','Modo de Trabajo', 'develop')
    .option('-u <user>', 'Usuario que va a utilizar la app', "No se declaro ningun usuario")
program.parse()

export default program;