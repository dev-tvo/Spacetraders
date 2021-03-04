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
                showMap: false,
                locations: {},
                currentLocation: '',
                token: '271caf69-3c21-475c-98d5-9bf6986bb04d',
                shipId: 'cklunq2wz308015c889az2fdvo3',
                locationSymbol: '',
                travelTimeRemaining: 0,
                flightPlanId: 'ckluv00g3410248c889ge6qq9rl',
                amountOfGoods: 0,
                fuelAmount: 0,
                typeOfGoods: '',
                locationType: '',
                travelPlan: {},
            }
        },
        delimiters: ['{{', '}}'],
        unsafeDelimiters: ['{**', '**}'],
        computed: {},
        watch: {
            currentLocation: function () {

            }
        },
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
                    self.currentLocation = self.user.ships[0].location;

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
                });
            },
            takeLoan: function (type) {
                var self = this;
                var settings = {
                    "url": `https://api.spacetraders.io/users/Bubster/loans?token=${this.token}`,
                    "method": "POST",
                    "data": {
                        "type": `${type}`,
                    },
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);
                    self.getUser();
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
            },
            purchaseFuel: function () {
                var self = this;
                var settings = {
                    // change quanitity later.
                    "url": `https://api.spacetraders.io/users/Bubster/purchase-orders?token=${this.token}`,
                    "method": "POST",
                    "data": {
                        "shipId": `${this.shipId}`,
                        "good": `FUEL`,
                        "quantity": `${this.fuelAmount}`
                    },
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.getUser();
                });
            },
            getLocations: function () {
                var self = this;
                var settings = {
                    "url": `https://api.spacetraders.io/game/systems/OE/locations?token=${this.token}`,
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.locations = response.locations;
                    console.log(self.locations);

                });
            },
            goToLocation: function (location) {
                var self = this;
                var settings = {
                    "url": `https://api.spacetraders.io/users/Bubster/flight-plans?token=${this.token}`,
                    "method": "POST",
                    "data": {
                        "shipId": `${this.shipId}`,
                        "destination": `${location}`
                    },
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.travelPlan = response.flightPlan;

                    self.travelTime(response.flightPlan.timeRemainingInSeconds);
                    self.getTravelInfo();
                    self.getLocations();
                    self.getUser();
                });
            },
            getTravelInfo: function () {
                var self = this;
                var settings = {
                    "url": `https://api.spacetraders.io/users/Bubster/flight-plans/${this.travelPlan.id}?token=${this.token}`,
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    console.log(response);

                });
            },
            purchaseGoods: function () {
                var self = this;
                var settings = {
                    // change quanitity later.
                    "url": `https://api.spacetraders.io/users/Bubster/purchase-orders?token=${this.token}`,
                    "method": "POST",
                    "data": {
                        "shipId": `${this.shipId}`,
                        "good": `${this.typeOfGoods}`,
                        "quantity": `${this.amountOfGoods}`
                    },
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.getUser();
                });
            },
            sellGoods: function (goods, quantity) {
                var self = this;
                var settings = {
                    "url": `https://api.spacetraders.io/users/Bubster/sell-orders?token=${this.token}`,
                    "method": "POST",
                    "data": {
                        "shipId": `${this.shipId}`,
                        "good": `${goods}`,
                        "quantity": `${quantity}`,
                    },
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    self.getUser();
                });
            },
            travelTime: function (time) {
                var self = this;
                var timer = setInterval(function () {
                    time--;
                    self.travelTimeRemaining = time;
                    if (time == 1) {
                        clearInterval(timer);
                    }
                }, 1000);
            },
            viewMarketplace: function () {
                var self = this;
                var settings = {
                    "url": `https://api.spacetraders.io/game/locations/${self.currentLocation}/marketplace?token=${this.token}`,
                    "method": "GET",
                    "timeout": 0,
                };

                $.ajax(settings).done(function (response) {
                    console.log(response.planet.marketplace);

                });
            },
        },
        mounted: function () {
            this.getUser();
            this.getLoans();
            this.getShips();
            this.getLocations();
            $('.toggle-info').click(function () {
                if ($('.general-info').hasClass('closed')) {
                    $('.general-info').removeClass('closed');
                    $('.toggle-info').html('close');
                } else {
                    $('.general-info').addClass('closed');
                    $('.toggle-info').html('open');
                }
            });
        }
    });
}

$(document).ready(function () {

});

// useful links / implement later:
// https GET api.spacetraders.io / game / locations / ${currentLocation} / marketplace token == $token