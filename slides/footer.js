var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
if (window.location.search.match( /print-pdf/gi ))
    link.href = '../../reveal.js/css/print/pdf.css';
else
    link.href = '../../reveal.js/css/print/paper.css';
document.getElementsByTagName( 'head' )[0].appendChild( link );
head.load("../../reveal.js/dist/reveal.js", function() {
    var revealopts = {
	//This width and height allows printing to pdf at A4 and is slightly widescreen to give the best all round size
	width:1920,height:1080,margin:0.1, minScale:0.2, maxScale:1.5,
	slideNumber: 'c / t',
	history: true,
	transition: 'fade',
	backgroundTransition: 'fade',
	pdfMaxPagesPerSlide: 1,
	controls:false,
	dependencies: [
	    // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
	    { src: '../../reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
	    // Syntax highlight for <code> elements
	    { src: '../../reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
	    // MathJax
	    { src: '../../reveal.js-plugins/chalkboard/chalkboard.js'},
	    { src: '../../reveal.js-plugins/menu/menu.js'},
	],
	keyboard: {
	    67: function() { RevealChalkboard.toggleNotesCanvas() },	// toggle chalkboard when 'c' is pressed
	    66: function() { RevealChalkboard.toggleChalkboard() },	// toggle chalkboard when 'b' is pressed
	    46: function() { RevealChalkboard.clear() },	// clear chalkboard when 'DEL' is pressed
	    8: function() { RevealChalkboard.reset() },	// reset all chalkboard data when 'BACKSPACE' is pressed
	    68: function() { RevealChalkboard.download() },	// downlad chalkboard drawing when 'd' is pressed
	    82: function() { Recorder.toggleRecording(); },	// press 'r' to start/stop recording
	    90: function() { Recorder.downloadZip(); }, 	// press 'z' to download zip containing audio files
	    84: function() { Recorder.fetchTTS(); } 	// press 't' to fetch TTS audio files		 
	},
	menu: {
	    loadIcons:false,
	    titleSelector:'WILLNOTFINDTITLES',
	    markers: true,
	    hideMissingTitles: true,
	    themes: false,
	    transitions: false,
	    custom: [
		{ title: 'Lectures', icon: '<i class="fa fa-graduation-cap"></i>', src: 'toc.html' },
	    ]
	},
	chalkboard: { // font-awesome.min.css must be available
	    //src: "chalkboard/chalkboard.json",
	    toggleChalkboardButton: { left: "80px" },
	    toggleNotesButton: { left: "130px" },
	},
    };

    if (!(typeof(audiofiles) === 'undefined')) {
	revealopts.dependencies = revealopts.dependencies.concat([
            { src: '../../reveal.js-plugins/audio-slideshow/slideshow-recorder.js', condition: function( ) { return !!document.body.classList; } },
	    { src: '../../reveal.js-plugins/audio-slideshow/audio-slideshow.js', condition: function( ) { return !!document.body.classList; } },
	]);
	revealopts.audio = {
	    prefix: audiofiles,
	    autoplay:false,
	};
    }
	
    Reveal.initialize(revealopts);

    head.load("../../MathJax/MathJax.js?config=TeX-AMS_SVG-full", function() {
	//Set up mathjax
	MathJax.Hub.Config({
	    messageStyle: 'none',
	    tex2jax: {
		inlineMath: [['$','$'],['\\(','\\)']] ,
		skipTags: ['script','noscript','style','textarea','pre']
	    },
	    skipStartupTypeset: true
	});

	// Typeset followed by an immediate reveal.js layout since
	// the typesetting process could affect slide height
	MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub ] );
	MathJax.Hub.Queue( Reveal.layout );

	if (window.location.search.match( /print-pdf/gi ))
	    MathJax.Hub.Queue([function () { window.print(); }]);
	
	// Reprocess equations in slides when they turn visible
	Reveal.addEventListener( 'slidechanged', function( event ) {
	    MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, event.currentSlide ] );
	} );
    });
});
head.load("../../js/jquery-dist/dist/jquery.min.js")

//var toc = $('.tableofcontents');
//if (toc.length) {
//    toc = toc[0];
//    $('div section')
//}
