window.onload = function () {
    window.vue_spacetraders = new Vue({
        parent: VueApp,
        el: "#spacetraders",
        filters: {},
        data: function () {
            return {
                user: {},
                loans: {},
                ships: [],
            }
        },
        delimiters: ['{{', '}}'],
        unsafeDelimiters: ['{**', '**}'],
        computed: {},
        watch: {},
        methods: {
            getUser: function () {
                var self = this;
                var settings = {
                    "url": "https://api.spacetraders.io/users/Bubster?token=271caf69-3c21-475c-98d5-9bf6986bb04d",
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.user = response.user;
                    console.log(self.user);

                });
            },
            getLoans: function () {
                var self = this;
                var settings = {
                    "url": "https://api.spacetraders.io/game/loans?token=271caf69-3c21-475c-98d5-9bf6986bb04d",
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.loans = response.loans;
                    // console.log(self.loans);

                });
            },
            getShips: function () {
                var self = this;
                var settings = {
                    "url": "https://api.spacetraders.io/game/ships?token=271caf69-3c21-475c-98d5-9bf6986bb04d",
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.ships = response.ships;
                });
            }
        },
        mounted: function () {
            this.getUser();
            this.getLoans();
            this.getShips();
        }
    });
}

// shipid: cklunq2wz308015c889az2fdvo3