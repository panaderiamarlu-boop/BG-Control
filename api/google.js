/*
 BG CONTROL
 DEBUG GOOGLE BRIDGE
*/


export default async function handler(req, res) {


    const GOOGLE_API =
    "https://script.google.com/macros/s/AKfycbw0Gb-78mX0V-yUKCks6cSowz8F-tBTte9_Ppvr5tuCBGykBe4qNfFB3dQuGcmb2mbQNw/exec";



    try {


        const respuesta =
        await fetch(
            GOOGLE_API + "?accion=productos"
        );



        const texto =
        await respuesta.text();



        res.status(200).json({

            status: respuesta.status,

            contenido: texto.substring(0,500)

        });



    } catch(error){


        res.status(500).json({

            error:error.message

        });


    }


}
