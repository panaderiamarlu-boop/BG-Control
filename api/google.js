/*
=====================================
 BG CONTROL
 VERCEL API BRIDGE

 Vercel
    ↓
 Google Apps Script
    ↓
 Google Sheets
=====================================
*/


export default async function handler(req, res) {


    const GOOGLE_API =
    "https://script.google.com/macros/s/AKfycbw0Gb-78mX0V-yUKCks6cSowz8F-tBTte9_Ppvr5tuCBGykBe4qNfFB3dQuGcmb2mbQNw/exec";



    try {


        // Acción recibida desde BG Control

        const accion =
        req.query.accion || "productos";



        // Consulta a Google Apps Script

        const respuesta =
        await fetch(
            GOOGLE_API +
            "?accion=" +
            encodeURIComponent(accion)
        );



        if(!respuesta.ok){


            throw new Error(
                "Google API respondió con error: " +
                respuesta.status
            );


        }



        const datos =
        await respuesta.json();



        // Respuesta hacia BG Control

        res.status(200).json(datos);



    } catch(error) {



        console.error(
            "ERROR GOOGLE BRIDGE:",
            error
        );



        res.status(500).json({


            estado:"ERROR",

            mensaje:
            "No fue posible conectar con Google Sheets",

            detalle:
            error.message


        });



    }


}
