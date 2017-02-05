

var UserView = Backbone.View.extend({
    el: '#container',    
    initialize: function () {
        me = this;
        this.user1 = new User({});
        this.render()
    },
    compiletemplate: function (elm) {
        var template = Handlebars.compile(elm);
        var markup = template(this.user1.attributes);
        return markup;
    },
    render: function () {
        // var htmltemplate = $("#form-1");
        $.get("scripts/tamplates/form1.html", function(data){
            var htmltemplate = data;
            var markup = me.compiletemplate(htmltemplate);
            me.$el.html(markup);          
        });
        $('.submit').click(me.sendmail);
    },
    navigate: function () {
        $.get("scripts/tamplates/form2.html", function(data){
            var htmltemplate = data;
            var markup = me.compiletemplate(htmltemplate);
            me.$el.html(markup);
            Backbone.history.navigate('#form2');
        })
    },
    events: {
        "focusout #fname": "firstname",
        "focusout #lname": "lastname",
        "click #nextpage": "renderNextPage",
        "focusout #addOne": "AddressOne",
        "focusout #addTwo": "AddressTwo",
        "focusout #city": "City",
        "focusout #state": "State",
        "focusout #zipcode": "ZipCode",
        "click #complete": "submitForm"
       
    },

    firstname: function () {
        var newName = $('#fname').val();
        this.user1.set('firstName', newName);
    },
    lastname: function () {
        var newName = $('#lname').val();
        this.user1.set('lastName', newName);
    },
    AddressOne: function () {
        var newName = $('#addOne').val();
        this.user1.set('addressOne', newName);
    },
    AddressTwo: function () {
        var newName = $('#addTwo').val();
        this.user1.set('addressTwo', newName);
    },
    City: function () {
        var newName = $('#city').val();
        this.user1.set('city', newName);
    },
    State: function () {
        var newName = $('#state').val();
        this.user1.set('state', newName);
    },
    ZipCode: function () {
        var newName = $('#zipcode').val();
        this.user1.set('zipcode', newName);
    },
    renderNextPage: function () {
        if (this.validateName()) {
            this.navigate();
        } else {
            $('#error').text("Please Enter Firstname and Lastname!!");
        }
    },
    validateName: function () {
        document.querySelector("#error").innerHTML = "";
        var firstname = document.querySelector("#fname");
        var lastname = document.querySelector("#lname");
        var isFirstNameValid = firstname.checkValidity();
        var isLastNameValid = lastname.checkValidity();
        if (isFirstNameValid && isLastNameValid) {
            return true;
        } else {
            return false;
        }
    },
    validateAddress: function () {
        document.querySelector("#error").innerHTML = "";
        var addressOne = document.querySelector("#addOne");
        var city = document.querySelector("#city");
        var state = document.querySelector("#state");
        var zip = document.querySelector("#zipcode");
        var isAddressValid = addressOne.checkValidity();
        var isCityValid = city.checkValidity();
        var isStateValid = state.checkValidity();
        var iszipValid = zip.checkValidity();
        if (isAddressValid && isCityValid && isStateValid && iszipValid) {
            return true;
        } else {
            return false;
        }
    },
    submitForm: function () {
        if (this.validateAddress()) {
            $.get("scripts/tamplates/success.html", function (data) {
                var htmltemplate = data;
                var markup = me.compiletemplate(htmltemplate);
                me.$el.html(markup);
                Backbone.history.navigate('#success');
            });           
        } else {
            $('#error').text("Address is a required Field");
        }
    },
    toastmsg: function (status) {
        var x = document.getElementById("snackbar");
        if (status) {
            $('#snackbar').text("");
            $('#snackbar').text("Message sent successfully!!");
            document.getElementById("contectme").reset();
        } else {
            $('#snackbar').text("");
            $('#snackbar').text("Error occurred! Please try again.");
        }
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    },
    sendmail: function(){
        var name = $('#name').val();
        var sub = $('#Subject').val();
        var email = $('#email').val();
        var msg = $('#message').val();
        if (name && sub && email && msg) {
            $.ajax({
                url: "http://mywork.dev-tech.club/ravi_mail.php",
                data: { "template": "<html><body><div> <div><label>Name: </label>  " + name + "</div> <div><lable>Email: </lable> " + email + "</div> <div><label>Subject: </label>" + sub + "</div>    <div><label>Message: </label>" + msg + "</div></div></body></html>" },
                success: function (data) {
                    data = JSON.parse(data);
                    me.toastmsg(data.status);
                },
                error: function (XHR, status, error) {
                    toastmsg(false);
                }
            })
        } else {
            me.toastmsg(false);
        }
    }
});
var newUserView = new UserView();
