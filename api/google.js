/*
=====================================
 BG CONTROL
 VERCEL API BRIDGE
=====================================
*/


export default async function handler(req, res) {


    const GOOGLE_API =
    "https://script.google.com/macros/s/AKfycbw0Gb-78mX0V-yUKCks6cSowz8F-tBTte9_Ppvr5tuCBGykBe4qNfFB3dQuGcmb2mbQNw/exec";



    try {


        const accion =
        req.query.accion || "productos";



        const respuesta =
        await fetch(
            GOOGLE_API +
            "?accion=" +
            encodeURIComponent(accion)
        );



        const datos =
        await respuesta.json();



        // DEVUELVE DIRECTAMENTE EL ARRAY
        res.status(200).json(datos);



    } catch(error){


        res.status(500).json({

            error:error.message

        });


    }


}


}
