//controlador global de la aplicacion
var cursosController = (function() {

    var CursosOfertados =[
        {   id:1001,
            name: "Introduccion a La programación",
            duracion: 40
        },
        {   id:1002,
            name: "Introduccion a la ingenieria de sistemas",
            duracion: 30
        },
        {   id:1003,
            name: "Calculo integral",
            duracion: 40
        }
    ];
    return {
        getCourses: function(){
            return CursosOfertados;
        }
    }
})();



//Controlador global de la aplicacion
var controller = (function(cursosCtrl){

    let  courses = cursosController.getCourses();
    return {
        //Muestra el listado de cursos
        verCursos: function() {
            for (i = 0; i < courses.length; ++i) {
                (function (i) {
                    setTimeout(function () {
                      console.log(courses[i].id + " ) " + courses[i].name+ " Duración: " + courses[i].duracion );
                    }, 2000*i);
                  })(i);
              }
        }
    }


})(cursosController);


//historia 1
controller.verCursos();