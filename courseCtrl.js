//controlador global de la aplicacion
var cursosController = (function() {

    const CursosOfertados = require('./data');

    
    /* Buscar un curso +*/
    let findCourse = (id) =>{
        const course = CursosOfertados.find(curso => curso.id === id);
        return course;
    };

    /* Generar archivo de inscripcion*/
    let  writeFile = (course, name, cedula) =>{
        const fs = require('fs');
        let{ id, coursename,duracion, valor}  = course;

        let texto_inscripcion = 'EL ESTUDIANTE: '+ name +' \nCÉDULA: ' + cedula + '\n'+
        "FUE INSCRITO EN EL CURSO: "+ coursename + "\nDURACIÓN: "+duracion + "\nVALOR: $" + valor;
        
        fs.writeFile('inscripcion-' + cedula + '.txt',texto_inscripcion,(err)=>{
            if(err) throw(err);
            console.log('se ha creado el archivo de inscripción');
        });
    }

    return {
        getCourses: function(){
            return CursosOfertados;
        },
        inscribirEstudiante(args){
            resultCourse = findCourse(args.i);
            if(resultCourse !==undefined ){
                let{ id, name,duracion, valor}  = resultCourse;
                if(id){
                    console.log("\nESTÁS INTERESADO EN EL CURSO: "+ id +" "+  name + ": DURACIÓN"+ duracion + " - VALOR: "+valor );
                    writeFile(resultCourse, args.n, args.c);
                    return true;
                }

            }else{
                console.log("\nNo se encontro ningún curso con ese id: "+  args.i + "\nEste es el listado de cursos ");
                return false;
            }
        }
    }
})();

const opciones ={
    idCurso:{
        demand: true,
        alias: 'i'
    },
    nombre:{
        demand: true,
        alias: 'n'
    },
    cedula:{
        demand: true,
        alias: 'c'
    },
}

const argv = require('yargs')
            .command('inscribir','Inscribir un estudiante en el curso',opciones)
            .argv
module.exports = {cursosController, argv };
