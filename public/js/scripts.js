var code;

function startCountDownTimer() {
    // reload page after 15 seconds
    var timeleft = 15;
    var downloadTimer = setInterval(function() {
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            location.reload();
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds until reset.";
        }
        timeleft -= 1;
    }, 1000);
}

function validate() {
    var inputComplete;
    code = "";
    
    code = $("[id*=code]").val();
    (code.length === 5) ? inputComplete = true : inputComplete = false;
    
    if (inputComplete) {
        $("[id*=submit]").addClass("complete");
        $("[id*=submit]").attr({ disabled: false, style: "opacity: 100%" });
    }
    else {
        $("[id*=submit]").removeClass("complete");
        $("[id*=submit]").attr({ disabled: true, style: "opacity: 20%" });
    }
}

function submitCode() {
    var url = "api/code";
    postData = { code: code };

    $.ajax({
        type: "POST",
        contentType: " application/json",
        url: url,
        data: JSON.stringify(postData),
        success: function (isCodeValid) {

            if(isCodeValid) {
                // show message
                $("[id*=form-content]").empty();
                $("[id*=form-content]")
                .append($("<img />").attr({ id: "img-confetti", src: "public/assets/img/confetti.svg", style: "width: 200px; margin: 50px 0 50px 0;" }))
                .append($("<h1 />").attr({ class: "accept-h1", style: "color: black; text-align: center;" }).html("Code received. Be safe out there!"))
                .append($("<h1 />").attr({ id: "countdown", class: "accept-h1", style: "color: black; text-align: center;" }));

                // start reset timer
                startCountDownTimer();

                // fireworks
                $("[id*=page-content]").prepend($("<div />").attr({ class: "pyro", style: "width: 100%;" }));
                $("[class*=pyro]").append($("<div />").attr({ class: "before" }));
                $("[class*=pyro]").append($("<div />").attr({ class: "after" }));
            }
            else {
                $("[id*=form-label]").html("Invalid code.").attr({ style: "color: red; text-align: center;" });
                $("[id*=form-label]").effect("shake");
            }
        },
        error: function(xhr, status, error) {
            var errorMessage = xhr.status + ": " + xhr.statusText;
            console.log(errorMessage);

            // show error message
            $("[id*=form-label]").html("Internal server error. Please try again later.").attr({ style: "color: red; text-align: center;" });
            $("[class*=code-input]").attr({ style: "border-color: red; width: 100px;" });
            $("[id*=form-label]").effect("shake");
        },
        async: true
    });
}

$(document).ready(function() {
    $("[class*=code-input]").val("");

    // click event if "enter" is pressed
    $("[class*=code-input]").keypress(function(event) {
        if ((event.keyCode == 13 || event.which == 13) && $("[id*=submit]").hasClass("complete")) {
            $("[id*=submit]").click();
        }
    });
});