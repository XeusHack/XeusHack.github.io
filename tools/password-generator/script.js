/* Author: Lambry */
(function(){

	// Show more info
	$('.show-more').on('click', function() {
		$('.more').slideToggle();
	});

	// Int screwDefaultButtons
	if(Modernizr.mq('only screen and (max-width: 767px)')) {
		$('input:checkbox').screwDefaultButtons({
			checked: 'url(/tools/password-generator/checked-s.png)',
			unchecked:	'url(/tools/password-generator/unchecked-s.png)',
			width:	 20,
			height:	 20
		});
	} else {
		$('input:checkbox').screwDefaultButtons({
			checked: 'url(/tools/password-generator/checked.png)',
			unchecked:	'url(/tools/password-generator/unchecked.png)',
			width:	 37,
			height:	 37
		});
	}

	// Prevent default form submit
	$('#password').on('submit', function(e) {
		e.preventDefault();
	});

	// Run calculations on textchange
	var timeout;
	$('#characters').bind('textchange', function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			password();
		});
	});

	// Run calculations of checkbox change
	$('input:checkbox').on('change', function() {
		password();
	});

	// Run calculations of refresh
	$('#refresh').on('click', function() {
		password();
	});

	// Set variables
	var numbers = 10,
	letters = 26,
	upper = 26,
	special = 33,
	numbersList = '0123456789',
	lettersList = 'abcdefghiklmnopqrstuvwxyz',
	upperList = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ',
	specialList = '`~!@#$%^&*()_-+={}|[]\\;\':",./<>?',
	useNumbers = '',
	useLetters = '',
	useSpecial = '',
	useUpper = '';

	// Gererate first random password, and combinations
	password();

	// Get values
	function password() {

		var characters = $('#characters').val(),
		stateNumbers = $('#numbers').attr('checked')?true:false,
		stateLower = $('#letters').attr('checked')?true:false,
		stateSpecial = $('#special').attr('checked')?true:false,
		stateUpper = $('#upper').attr('checked')?true:false;
		if(characters> 500)
		{
			$('#characters').val('500');
			characters = '500';
		}
		combinations(characters, stateNumbers, stateLower, stateSpecial, stateUpper);
		generator(characters, stateNumbers, stateLower, stateSpecial, stateUpper);

	}

	function niceNumber(num) {
		try{
			var sOut = num.toString();
			if ( sOut.length >=17 || sOut.indexOf("e") > 0){
				sOut=parseFloat(num).toPrecision(4)+"";
				sOut = sOut.replace("e+","x10^");
			}
			return sOut;

		}
		catch ( e) {
			return num;
		}
	}

	function combinations(characters, stateNumbers, stateLower, stateSpecial, stateUpper) {

		// Use what
		if (stateNumbers) { useNumbers = numbers; } else { useNumbers =  0; }
		if (stateLower) { useLetters = letters; } else { useLetters =  0; }
		if (stateSpecial) { useSpecial = special; } else { useSpecial =  0; }
		if (stateUpper) { useUpper = upper; } else { useUpper =  0; }

		var use = (useNumbers + useLetters + useSpecial + useUpper),
		combs = Math.pow(use,characters);
		$("#combinations").val(niceNumber(combs));
		
		$("#combinations").prettynumber();
	}

	function generator(characters, stateNumbers, stateLower, stateSpecial, stateUpper) {

		$("#generated").val('');

		// Use what
		if (stateNumbers) { useNumbers = numbersList; } else { useNumbers =  ''; }
		if (stateLower) { useLetters = lettersList; } else { useLetters =  ''; }
		if (stateSpecial) { useSpecial = specialList; } else { useSpecial =  ''; }
		if (stateUpper) { useUpper = upperList; } else { useUpper =  ''; }

		var randomString = '',
		use = undefined,
		use = useNumbers + useLetters + useSpecial + useUpper;

		for (var i=0; i<5; i++) {
			randomString = '';
			for (var j=0; j<characters; j++) {
				var rnum = Math.floor(Math.random() * use.length);
				randomString += use.substring(rnum,rnum+1);
			}
			if(stateNumbers && !hasNumber(randomString))
				continue; 
			if(stateLower && !hasLowerCase(randomString))
				continue;
			if(stateUpper && !hasUpperCase(randomString))
				continue;
			if(stateSpecial && !hasSpecial(randomString))
				continue;
			else
				break;

		}

		// Update generator
		$("#generated").val(randomString);
	}

	function hasNumber(myString) {
		return /\d/.test(myString);
	}

	function hasLowerCase(str) {
		return (/[a-z]/.test(str));
	}
	function hasUpperCase(str) {
		return (/[A-Z]/.test(str));
	}
	function hasSpecial(string){
		for(i = 0; i < specialList.length;i++){
			if(string.indexOf(specialList[i]) > -1){
				return true
			}
		}
		return false;
	}
})();