const {cursosController, argv }= require('./courseCtrl');

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