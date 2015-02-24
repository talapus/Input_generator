// ==UserScript==
// @name         Generate New Invitations
// @namespace    http://crowdcompass.com
// @version      0.1
// @description  Generate new invitations
// @author       Ramiro Jr. Franco
// @match        http://event.crowdcompass.dev:3000/*
// @match        http://event.development.crowdcompass.com/*
// @match        http://event.staging.crowdcompass.com/*
// @match        http://event.crowdcompass.com/*
// @grant        none
// ==/UserScript==

// Generated by CoffeeScript 1.8.0
(function() {

  var InvitationGenerator;

  InvitationGenerator = (function() {
    function InvitationGenerator(ident, count) {
      var _i, _ref;
      this.ident = ident;
      this.count = count;
      for (_i = 1, _ref = this.count; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        this.newInviteRequest(this.createInvite());
      }
    }

    InvitationGenerator.prototype.description = ['A monstrous camera takes everyones soul.', 'Tuxedo mask finally shows who he really is!', 'Grandpa starts an aerobics-martial-arts class.', 'Sailor V reveals her true idenity', 'The sailors are going to be transmogrified so everything will be ok.', 'Cherry blossom watching in the park with the girls', 'Usagi and Rei go to an amusement park and it\'s a disaster.', 'Esmeralda does something devious to upset the rest of the jewel-themed bad guys.', 'Chibi-usa goes dark, and attacks the other scouts.', 'The ladies team up against a gambling-obsessed monster.', 'Usagi finds the purity chalice, inside of herself.', 'Hotaru yields her glaive for the first and last time.', 'Sailor Uranus and Neptune show up and save everyone, as per uge.', 'Sailor Galaxia threatans the entire universe, revealing herself out of the darkness countless episodes after she was first mentioned.', 'The Sailor Stars show up, they are actually she\'s but sometimes he\'s ...', 'A tea master invites the girls over, only to find a dark presence...', 'Pegasus?! What?! A horse that flies? That\'s crazy.', 'Rei puts together a festival at her school that is a raging success, until she starts singing.', 'Usagi joins a gym to lose some weight, because you know ...', 'The girls all get together to make some curry, Usagi is miserable at it, but Makoto is great.', 'A new small child appears with bright red pink hair that no one can seem to claim.', 'Turns out, love saves the day again.', 'A mysterious dark cloud causes cavities throught Tokyo, causing everyone to visit a single evil dentist.', 'Tuxedo mask thinks he\'s taking a flight to America, and instead ends up in an alternate dimension.', 'We fight a horde of cute kitties hiding inside a building.', 'Turns out, Sailor Uranus is hiding a sword deep inside herself.', 'A mystical flower takes energy from everyone at the park, using other regular flowers as a proxy.', 'A young girl shrouded in mystery appears, could she be the dark messiah? Let\'s discuss.'];

    InvitationGenerator.prototype.title = ['A Moon Star Is Born', 'Death of the Sailor Guardians: The Tragic Final Battle', 'Death of Uranus and Neptune!? Talismans Appear', 'The Purity Chalice', 'The Science Of Love', 'No Ordinary Horsepower', 'Much Ado About Kitten', 'The Trouble With Love', 'Kicking Into High Gear', 'Beach Blanket Bungle', 'Dream Believer', 'Resurrection of the Queen of Darkness! When Scattered Flowers Create Nightmares', 'Usagi\'s Love! The Moonlight Lights Up the Galaxy', 'Who Is That Masked Man?', 'Sailor Venus\' Past: Minako\'s Tragic Love', 'VR Madness', 'Mirror, Mirror on the Wall', 'The Cosmetic Caper', 'Prediction of Doom', 'Enemies No More', 'Brotherly Love', 'Birth of Wicked Lady', 'Star Struck, Bad Luck', 'Crystal Clear Again', 'Tainted Tea Party', 'Hello, Sailor Mini Moon', 'Everything\'s Coming Up Rosey', 'Thorny Weather', 'Clothes Call', 'Tutu Treachery', 'Dental Dilemma', 'Love and Moon Power! The End of The Nightmare', 'The Mystery of Chibi Chibi! The Big Noisy Chase'];

    InvitationGenerator.prototype.location = ['Crowd Compass', 'Some other place', 'The Moon Kingdom', 'The Dark Moon Kingdom', 'The negaverse', 'Dream world', 'Silver Millennium', 'Earth', 'Juuban High School', 'Galaxy Cauldron', 'Infinity Academy', 'Elysion', 'Nemesis', 'Japan', 'Tokyo', 'Crystal Palace'];

    InvitationGenerator.prototype.today = function() {
      return moment().hours(0).minutes(0).seconds(0);
    };

    InvitationGenerator.prototype.randomTime = function() {
      var random_number, time;
      random_number = Math.floor(Math.random() * 23);
      time = this.today().add(random_number, 'hours');
      if (this.random([true, false])) {
        time.add(30, 'minutes');
      }
      return time;
    };

    InvitationGenerator.prototype.random = function(array) {
      return array[Math.floor(Math.random() * array.length)];
    };

    InvitationGenerator.prototype.createInvite = function() {
      var rails_format, random_time, thirty_minutes_later;
      random_time = this.randomTime();
      thirty_minutes_later = moment(random_time).add(30, 'minutes');
      rails_format = 'YYYY-MM-DD HH:mm:ss';
      return {
        activity_name: this.random(this.title),
        location: this.random(this.location),
        note: this.random(this.description),
        invitees: [this.ident],
        start_datetime: random_time.format(rails_format),
        end_datetime: thirty_minutes_later.format(rails_format)
      };
    };

    InvitationGenerator.prototype.newInviteRequest = function(schedule_item) {
      return $.ajax({
        url: "" + App.paths.hub + "/client/v3/user/events/" + event_oid + "/schedule_items",
        type: 'post',
        dataType: 'json',
        data: {
          schedule_item: schedule_item,
          access_token: window.access_token
        }
      });
    };

    return InvitationGenerator;

  })();

  window.InvitationGenerator = InvitationGenerator;

}).call(this);
