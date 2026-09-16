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



        const url =
        GOOGLE_API +
        "?accion=" +
        encodeURIComponent(accion);



        const respuesta =
        await fetch(url);



        const datos =
        await respuesta.json();



        res.status(200).json(datos);



    } catch(error) {


        console.error(error);


        res.status(500).json({

            estado:"ERROR",

            mensaje:error.message

        });


    }


}
