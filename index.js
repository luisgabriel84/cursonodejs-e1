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

//controlador global de la aplicacion
var cursosController = (function() {

    const CursosOfertados =[
        {   id:1001,
            name: "Introducción a La programación",
            duracion: 40,
            valor:350000
        },
        {   id:1002,
            name: "Introducción a la ingeniería de sistemas",
            duracion: 30,
            valor:380000
        },
        {   id:1003,
            name: "Cálculo integral",
            duracion: 40,
            valor:400000
        },
        {   id:1004,
            name: "Teología",
            duracion: 20,
            valor:100000
        },
        {   id:1005,
            name: "Constitución Política",
            duracion: 20,
            valor:100000
        }
    ];

    /* Buscar un curso +*/
    let findCourse = (id) =>{
        const course = CursosOfertados.find(curso => curso.id === id);
        return course;
    };

    /* Generar archivo de inscripcion*/
    let  writeFile = (course, name, cedula) =>{
        const fs = require('fs');

        let texto_inscripcion = 'EL ESTUDIANTE: '+ name +' \nCÉDULA: ' + cedula + '\n'+
        "FUE INSCRITO EN EL CURSO: "+ course.name + "\nDURACIÓN: "+course.duracion + "\nVALOR: $" + course.valor;
        
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
            let resultCourse = findCourse(args.i);
            if(resultCourse){
                console.log("\nESTÁS INTERESADO EN EL CURSO: "+ resultCourse.id +" "+  resultCourse.name + ": DURACIÓN"+ resultCourse.duracion + " - VALOR: "+resultCourse.duracion );
                writeFile(resultCourse, args.n, args.c);
                return true;
            }else{
                console.log("\nNo se encontro ningún curso con ese id: "+  args.i + "\nEste es el listado de cursos ");
                return false;
            }
        }
    }
})();

//Controlador global de la aplicación
var controller = (function(cursosCtrl){
    let  courses = cursosController.getCourses();

    let validarEntrada = (attr)=>{
        if(attr.i && attr.n && attr.c){
            return true;
        }
        return false;
    };

    return {
        // Inicializar  la aplicación
        init: function(args){
            if(!validarEntrada(args)){
                console.log("[ Bienvenido al listado de cursos a continuación se presentan los cursos ofertados ] \n----------------");
                this.verCursos();
            }else{
                if(cursosController.inscribirEstudiante(args)){
                    console.log("***************** \nEstudiante Inscrito");
                }else{
                    console.log("----------------");
                    this.verCursos();
                }
            }
        },

        //Muestra el listado de cursos
        verCursos: function() {
            for (i = 0; i < courses.length; ++i) {
                (function (i) {
                    setTimeout(function () {
                      console.log(courses[i].id + " ) " + courses[i].name+ " Duración: " + courses[i].duracion+ " - Valor: $" + courses[i].valor );
                    }, 2000*i);
                  })(i);
              }
        },
    }


})(cursosController);

//Ejecutar la aplicación
controller.init(argv);