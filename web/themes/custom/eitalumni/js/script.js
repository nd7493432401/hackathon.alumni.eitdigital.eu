(function ($, Drupal) {
	'use strict';

	$( document ).ready(function() {
		$("#edit-mail").attr("placeholder", "Your personal email");		

		if($("dl > .profile2-master-school").html() !== undefined ) {
			if($("dl > .profile2-master-school").html().trim() === null ||
				$("dl > .profile2-master-school").html().trim() === "") {
				$("#profile-master_school + h3").css("display", "none");
			} else {
				$("#profile-master_school + h3 + dl").css("padding-bottom", "30px");
				$("#profile-master_school + h3 + dl").css("margin-bottom", "40px");
				$("#profile-master_school + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}

		if($("dl > .profile2-eit-employee > .row > .col-sm-6").html() !== undefined ) {
			if($("dl > .profile2-eit-employee > .row > .col-sm-6").html().trim() === "" ||
			   $("dl > .profile2-eit-employee > .row > .col-sm-6").html().trim() === null) {
				$("#profile-eit_employee + h3").css("display", "none");
			} else {
				$("#profile-eit_employee + h3").css("margin-top", "40px");
				$("#profile-eit_employee + h3 + dl").css("padding-bottom", "30px");
				$("#profile-eit_employee + h3 + dl").css("margin-bottom", "40px");
				$("#profile-eit_employee + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}

		if($("dl > .profile2-eit-digital-friend > .row > .col-sm-6").html() !== undefined ) {
			if($("dl > .profile2-eit-digital-friend > .row > .col-sm-6").html().trim() === "" ||
			   $("dl > .profile2-eit-digital-friend > .row > .col-sm-6").html().trim() === null) {
				$("#profile-eit_digital_friend + h3").css("display", "none");
			} else {
				$("#profile-eit_digital_friend + h3 + dl").css("padding-bottom", "30px");
				$("#profile-eit_digital_friend + h3 + dl").css("margin-bottom", "40px");
				$("#profile-eit_digital_friend + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}

		if($("dl > .profile2-eit-phd-school").html() !== undefined ) {
			if($("dl > .profile2-eit-phd-school").html().trim() === "" ||
			   $("dl > .profile2-eit-phd-school").html().trim() === null) {
				$("#profile-eit_phd_school + h3").css("display", "none");
			} else {
				$("#profile-eit_phd_school + h3 + dl").css("padding-bottom", "30px");
				$("#profile-eit_phd_school + h3 + dl").css("margin-bottom", "40px");
				$("#profile-eit_phd_school + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}

		if($("dl > .profile2-summer-school > .row > .col-sm-12").html() !== undefined ) {
			if($("dl > .profile2-summer-school > .row > .col-sm-12").html().trim() === "" ||
			   $("dl > .profile2-summer-school > .row > .col-sm-12").html().trim() === null) {
				$("#profile-summer_school + h3").css("display", "none");
			} else {
				$("#profile-summer_school + h3 + dl").css("padding-bottom", "30px");
				$("#profile-summer_school + h3 + dl").css("margin-bottom", "40px");
				$("#profile-summer_school + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}

		if($("dl > .profile2-eit-professional-courses").html() !== undefined ) {
			if($("dl > .profile2-eit-professional-courses").html().trim() === "" ||
			   $("dl > .profile2-eit-professional-courses").html().trim() === null) {
				$("#profile-eit_professional_courses + h3").css("display", "none");
			} else {
				$("#profile-eit_professional_courses + h3 + dl").css("padding-bottom", "30px");
				$("#profile-eit_professional_courses + h3 + dl").css("margin-bottom", "40px");
				$("#profile-eit_professional_courses + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}

		if($("dl > .profile2-eit-professional-school").html() !== undefined ) {
			if($("dl > .profile2-eit-professional-school").html().trim() === "" ||
			   $("dl > .profile2-eit-professional-school").html().trim() === null) {
				$("#profile-eit_professional_school + h3").css("display", "none");
			} else {
				$("#profile-eit_professional_school + h3 + dl").css("padding-bottom", "30px");
				$("#profile-eit_professional_school + h3 + dl").css("margin-bottom", "40px");
				$("#profile-eit_professional_school + h3 + dl").css("border-bottom", "1px solid #e5e5e5");
			}
		}
	});

})(jQuery, Drupal);