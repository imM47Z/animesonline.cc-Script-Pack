// ==UserScript==
// @name         Subtitles Only
// @version      0.1
// @author       M47Z
// @match        *://animesonline.cc/episodio/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var IsPageLoad = ( ) => {
        return document.getElementById( "dt_contenedor" ) != null;
    }

    var WaitForPage = ( callbackFunction ) => {
        if ( !IsPageLoad( ) )
            setTimeout( () => WaitForPage( callbackFunction ), 1000 );

        callbackFunction( );
    }

    var ClickOnSubtitles = ( ) => {
        var liArray = document.getElementsByTagName( "li" );
        for ( var i = 0; i < liArray.length; i++ )
        {
            if( liArray[ i ].innerText != " Legendado" )
                continue;

            var aElem = liArray[ i ].children[ 0 ];
            if( !aElem.href.includes( window.location.href ) )
               continue;

            aElem.click( );
            return true;
        }

        return false;
    }

    WaitForPage( ( ) => {
        var clickOnSubtitlesInterval = setInterval( ( ) => {
            if ( ClickOnSubtitles( ) )
                clearInterval( clickOnSubtitlesInterval );
        }, 500);
    });
})();
