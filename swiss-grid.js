/*
 * Swiss Grid UI Kit for Oracle APEX Universal Theme 1.0.0: light and dark mode
 * TechRevX, MIT License - https://github.com/aamirkhanz/apex-swiss-grid-ui-kit
 *
 * The look is in swiss-grid.css; this file only switches between light and dark. Without it the kit stays light,
 * or follows a class you set yourself: <html class="sw-dark"> for dark.
 *
 * To avoid a flash of the wrong mode, put this in the page template's or application's HTML header
 * (Shared Components > User Interface > JavaScript > Function and Global Variable Declaration is too late):
 *   <script>(function(d){var m;try{m=localStorage.getItem("sw-mode")}catch(e){}
 *   if(m!=="dark"&&m!=="light")m=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
 *   d.documentElement.classList.add("sw-"+m)})(document);</script>
 *
 * API (window.swissGrid):
 *   getMode()                         "light" or "dark"
 *   setMode( "light" | "dark" | "auto", { save: true } )
 *                                     "auto" follows the operating system; the choice is kept in localStorage "sw-mode"
 *                                     unless save is false
 *   toggle()                          switches light and dark and keeps the choice
 * Buttons or links with the attribute data-sw-mode-toggle switch the mode when clicked; their aria-label, title and a
 * .fa icon (fa-moon-o / fa-sun-o) describe what they do next.
 * <html> fires "sw-modechange" with detail { mode } after a change.
 */
( function() {
    "use strict";

    const KEY = "sw-mode",
        root = document.documentElement,
        media = window.matchMedia ? window.matchMedia( "(prefers-color-scheme: dark)" ) : null;

    const system = () => media && media.matches ? "dark" : "light";
    const current = () => root.classList.contains( "sw-dark" ) ? "dark" : "light";

    function saved() {
        try {
            const v = localStorage.getItem( KEY );
            return v === "light" || v === "dark" || v === "auto" ? v : null;
        } catch ( e ) {
            return null;
        }
    }

    function save( v ) {
        try { localStorage.setItem( KEY, v ); } catch ( e ) { /* not kept, still switched */ }
    }

    function sync() {
        const dark = current() === "dark", label = dark ? "Switch to light mode" : "Switch to dark mode";
        document.querySelectorAll( "[data-sw-mode-toggle]" ).forEach( b => {
            b.setAttribute( "aria-label", label );
            b.title = label;
            const icon = b.querySelector( ".fa" );
            if ( icon ) {
                icon.classList.toggle( "fa-moon-o", !dark );
                icon.classList.toggle( "fa-sun-o", dark );
            }
        } );
    }

    function apply( mode ) {
        const changed = mode !== current() || !root.classList.contains( "sw-" + mode );
        root.classList.toggle( "sw-dark", mode === "dark" );
        root.classList.toggle( "sw-light", mode === "light" );
        sync();
        if ( changed ) { root.dispatchEvent( new CustomEvent( "sw-modechange", { detail: { mode } } ) ); }
    }

    window.swissGrid = {
        getMode: current,
        setMode( mode, options ) {
            if ( mode !== "light" && mode !== "dark" && mode !== "auto" ) { return; }
            if ( !options || options.save !== false ) { save( mode ); }
            apply( mode === "auto" ? system() : mode );
        },
        toggle() { window.swissGrid.setMode( current() === "dark" ? "light" : "dark" ); }
    };

    // the operating system's setting counts while the choice is "auto" or nothing was chosen
    if ( media && media.addEventListener ) {
        media.addEventListener( "change", () => {
            const s = saved();
            if ( !s || s === "auto" ) { apply( system() ); }
        } );
    }
    // no early snippet and no class of your own: use the saved choice or the operating system
    if ( !root.classList.contains( "sw-dark" ) && !root.classList.contains( "sw-light" ) ) {
        const s = saved();
        apply( s === "light" || s === "dark" ? s : system() );
    }

    // remember whether the last input was a pointer: some widgets focus from script, and the CSS shows their
    // focus ring only for keyboard use (html.sw-pointer)
    document.addEventListener( "pointerdown", () => root.classList.add( "sw-pointer" ), true );
    document.addEventListener( "keydown", () => root.classList.remove( "sw-pointer" ), true );

    document.addEventListener( "click", e => {
        const b = e.target.closest && e.target.closest( "[data-sw-mode-toggle]" );
        if ( b ) {
            e.preventDefault();
            window.swissGrid.toggle();
        }
    } );

    if ( document.readyState === "loading" ) {
        document.addEventListener( "DOMContentLoaded", sync );
    } else {
        sync();
    }
} )();
