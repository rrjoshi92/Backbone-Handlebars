var User = Backbone.Model.extend({
    defaults: {
        firstName: '',
        lastName: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        zipcode: ''
    },
    initialize: function () { }
});