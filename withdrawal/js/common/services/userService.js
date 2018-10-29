(function () {
    'use strict';

    app.factory('userService', [
        'httpService',
        '$rootScope',
        '$filter',
        '$q',
        userService
    ]);

    function userService(httpService, $rootScope, $filter, $q) {
        var user = {};

        return {
            getProfile: getProfile,
            getUserData: getUserData,
            getCountries: getCountries
        };

        function getProfile(isCacheFlush) {
            return user.profile && !isCacheFlush ? $q.resolve(user.profile) : _loadUserData('profile');
        }

        function getCountries(isCacheFlush) {
            return user.country && !isCacheFlush ? $q.resolve(user.country) : _loadUserData('country');
        }

        function getUserData(isCacheFlush) {
            return user.id && !isCacheFlush ? $q.resolve(user) : _loadUserData();
        }

        function _setRealBalance(userData) {
            // if (userData.profile.balance_type === 1) {
            //     return userData;
            // }

            angular.forEach(userData.profile.balances, function (balance) {
                if (balance.type === 1) {
                    // Get currency mask
                    var mask = $filter('money')(0, {
                        currency: balance.currency,
                        onlyMask: true
                    });
                    // Set real currency & balance
                    userData.profile.mask = mask;
                    userData.profile.balance_id = balance.id;
                    userData.profile.balance_type = balance.type;
                    userData.profile.currency = balance.currency;
                    userData.profile.balance = balance.amount / 1000000;
                    userData.profile.currency_char = mask.replace('%s', '');
                }
            });
            return userData;
        }

        function _loadUserData(keyName) {
            var config = {
                method: 'get',
                withCredentials: true,
                url: $rootScope.appConfig.iqoptionUrl + '/api/register/getregdata'
            };
            var data = {"country":[{"id":165,"name":"Россия"},{"id":13,"name":"Австралия"},{"id":14,"name":"Австрия"},{"id":15,"name":"Азербайджан"},{"id":2,"name":"Албания"},{"id":3,"name":"Алжир"},{"id":4,"name":"Американское Самоа"},{"id":7,"name":"Ангилья"},{"id":6,"name":"Ангола"},{"id":5,"name":"Андорра"},{"id":8,"name":"Антарктида"},{"id":9,"name":"Антигуа и Барбуда"},{"id":10,"name":"Аргентина"},{"id":11,"name":"Армения"},{"id":12,"name":"Аруба"},{"id":1,"name":"Афганистан"},{"id":16,"name":"Багамы"},{"id":18,"name":"Бангладеш"},{"id":19,"name":"Барбадос"},{"id":17,"name":"Бахрейн"},{"id":20,"name":"Беларусь"},{"id":22,"name":"Белиз"},{"id":21,"name":"Бельгия"},{"id":23,"name":"Бенин"},{"id":24,"name":"Бермудские острова"},{"id":32,"name":"Болгария"},{"id":26,"name":"Боливия"},{"id":27,"name":"Босния и Герцеговина"},{"id":28,"name":"Ботсвана"},{"id":30,"name":"Бразилия"},{"id":31,"name":"Бруней Даруссалам"},{"id":33,"name":"Буркина-Фасо"},{"id":34,"name":"Бурунди"},{"id":25,"name":"Бутан"},{"id":209,"name":"Вануату"},{"id":210,"name":"Ватикан"},{"id":206,"name":"Великобритания"},{"id":92,"name":"Венгрия"},{"id":211,"name":"Венесуэла"},{"id":213,"name":"Виргинские острова (Великобритания)"},{"id":214,"name":"Виргинские острова (США)"},{"id":60,"name":"Восточный Тимор"},{"id":212,"name":"Вьетнам"},{"id":75,"name":"Габон"},{"id":89,"name":"Гаити"},{"id":88,"name":"Гайана"},{"id":76,"name":"Гамбия"},{"id":79,"name":"Гана"},{"id":84,"name":"Гваделупа"},{"id":86,"name":"Гватемала"},{"id":87,"name":"Гвинея"},{"id":238,"name":"Гвинея-Бисау"},{"id":78,"name":"Германия"},{"id":236,"name":"Гернси"},{"id":80,"name":"Гибралтар"},{"id":90,"name":"Гондурас"},{"id":91,"name":"Гонконг"},{"id":83,"name":"Гренада"},{"id":82,"name":"Гренландия"},{"id":81,"name":"Греция"},{"id":77,"name":"Грузия"},{"id":85,"name":"Гуам"},{"id":56,"name":"Дания"},{"id":235,"name":"Демократическая Республика Конго"},{"id":239,"name":"Джерси"},{"id":57,"name":"Джибути"},{"id":58,"name":"Доминика"},{"id":59,"name":"Доминиканская Республика"},{"id":62,"name":"Египет"},{"id":218,"name":"Замбия"},{"id":215,"name":"Западная Сахара"},{"id":219,"name":"Зимбабве"},{"id":228,"name":"Израиль"},{"id":225,"name":"Индия"},{"id":94,"name":"Индонезия"},{"id":100,"name":"Иордания"},{"id":95,"name":"Ирак"},{"id":229,"name":"Иран"},{"id":96,"name":"Ирландия"},{"id":93,"name":"Исландия"},{"id":182,"name":"Испания"},{"id":97,"name":"Италия"},{"id":216,"name":"Йемен"},{"id":38,"name":"Кабо-Верде"},{"id":101,"name":"Казахстан"},{"id":39,"name":"Каймановы острова"},{"id":35,"name":"Камбоджа"},{"id":36,"name":"Камерун"},{"id":37,"name":"Канада"},{"id":162,"name":"Катар"},{"id":102,"name":"Кения"},{"id":54,"name":"Кипр"},{"id":105,"name":"Киргизия"},{"id":103,"name":"Кирибати"},{"id":43,"name":"Китай"},{"id":45,"name":"Кокосовые острова"},{"id":46,"name":"Колумбия"},{"id":47,"name":"Коморские острова"},{"id":48,"name":"Конго"},{"id":50,"name":"Коста-Рика"},{"id":51,"name":"Кот-д'Ивуар"},{"id":53,"name":"Куба"},{"id":104,"name":"Кувейт"},{"id":106,"name":"Лаос"},{"id":107,"name":"Латвия"},{"id":109,"name":"Лесото"},{"id":110,"name":"Либерия"},{"id":108,"name":"Ливан"},{"id":111,"name":"Ливия"},{"id":113,"name":"Литва"},{"id":112,"name":"Лихтенштейн"},{"id":114,"name":"Люксембург"},{"id":126,"name":"Маврикий"},{"id":125,"name":"Мавритания"},{"id":117,"name":"Мадагаскар"},{"id":127,"name":"Майотта"},{"id":115,"name":"Макао"},{"id":116,"name":"Македония"},{"id":118,"name":"Малави"},{"id":119,"name":"Малайзия"},{"id":121,"name":"Мали"},{"id":120,"name":"Мальдивские острова"},{"id":122,"name":"Мальта"},{"id":134,"name":"Марокко"},{"id":124,"name":"Мартиника"},{"id":123,"name":"Маршалловы острова"},{"id":128,"name":"Мексика"},{"id":129,"name":"Микронезия"},{"id":135,"name":"Мозамбик"},{"id":130,"name":"Молдова"},{"id":131,"name":"Монако"},{"id":132,"name":"Монголия"},{"id":133,"name":"Монтсеррат"},{"id":136,"name":"Мьянма"},{"id":137,"name":"Намибия"},{"id":138,"name":"Науру"},{"id":139,"name":"Непал"},{"id":145,"name":"Нигер"},{"id":146,"name":"Нигерия"},{"id":141,"name":"Нидерландские Антильские острова"},{"id":140,"name":"Нидерланды"},{"id":144,"name":"Никарагуа"},{"id":147,"name":"Ниуэ"},{"id":143,"name":"Новая Зеландия"},{"id":142,"name":"Новая Каледония"},{"id":149,"name":"Норвегия"},{"id":148,"name":"Норфолк"},{"id":205,"name":"Объединенные Арабские Эмираты"},{"id":150,"name":"Оман"},{"id":29,"name":"Остров Буве"},{"id":237,"name":"Остров Мэн"},{"id":44,"name":"Остров Рождества"},{"id":184,"name":"Остров Святой Елены"},{"id":49,"name":"Острова Кука"},{"id":234,"name":"Острова Теркс и Кайкос"},{"id":197,"name":"Острова Тонга"},{"id":151,"name":"Пакистан"},{"id":152,"name":"Палау"},{"id":241,"name":"Палестина"},{"id":153,"name":"Панама"},{"id":154,"name":"Папуа — Новая Гвинея"},{"id":155,"name":"Парагвай"},{"id":156,"name":"Перу"},{"id":158,"name":"Питкэрн"},{"id":159,"name":"Польша"},{"id":160,"name":"Португалия"},{"id":161,"name":"Пуэрто-Рико"},{"id":163,"name":"Реюньон"},{"id":166,"name":"Руанда\n"},{"id":164,"name":"Румыния"},{"id":63,"name":"Сальвадор"},{"id":169,"name":"Самоа"},{"id":170,"name":"Сан-Марино"},{"id":242,"name":"Сан-Томе и Принсипи"},{"id":171,"name":"Саудовская Аравия"},{"id":187,"name":"Свазиленд"},{"id":230,"name":"Северная Корея"},{"id":173,"name":"Сейшельские острова"},{"id":244,"name":"Сен-Бартелеми"},{"id":172,"name":"Сенегал"},{"id":243,"name":"Сент-Винсент и Гренадины"},{"id":167,"name":"Сент-Китс и Невис"},{"id":168,"name":"Сент-Люсия"},{"id":220,"name":"Сербия"},{"id":175,"name":"Сингапур"},{"id":245,"name":"Синт-Мартен"},{"id":190,"name":"Сирия"},{"id":176,"name":"Словакия"},{"id":177,"name":"Словения"},{"id":178,"name":"Соломоновы острова"},{"id":179,"name":"Сомали"},{"id":185,"name":"Судан"},{"id":186,"name":"Суринам"},{"id":174,"name":"Сьерра-Леоне"},{"id":192,"name":"Таджикистан"},{"id":194,"name":"Таиланд"},{"id":191,"name":"Тайвань"},{"id":193,"name":"Танзания"},{"id":195,"name":"Того"},{"id":196,"name":"Токелау"},{"id":198,"name":"Тринидад и Тобаго"},{"id":202,"name":"Тувалу"},{"id":199,"name":"Тунис"},{"id":201,"name":"Туркменистан"},{"id":200,"name":"Турция"},{"id":203,"name":"Уганда"},{"id":208,"name":"Узбекистан"},{"id":204,"name":"Украина"},{"id":207,"name":"Уругвай"},{"id":69,"name":"Фарерские Острова"},{"id":70,"name":"Фиджи"},{"id":157,"name":"Филиппины"},{"id":71,"name":"Финляндия"},{"id":68,"name":"Фолклендские острова"},{"id":72,"name":"Франция"},{"id":73,"name":"Французская Гвиана"},{"id":74,"name":"Французская Полинезия"},{"id":52,"name":"Хорватия"},{"id":40,"name":"Центральная Африка"},{"id":41,"name":"Чад"},{"id":221,"name":"Черногория"},{"id":55,"name":"Чешская Республика"},{"id":42,"name":"Чили"},{"id":189,"name":"Швейцария"},{"id":188,"name":"Швеция"},{"id":183,"name":"Шри-Ланка"},{"id":61,"name":"Эквадор"},{"id":64,"name":"Экваториальная Гвинея"},{"id":65,"name":"Эритрея"},{"id":66,"name":"Эстония"},{"id":67,"name":"Эфиопия"},{"id":181,"name":"Южная Корея"},{"id":180,"name":"Южно-Африканская Республика"},{"id":98,"name":"Ямайка"},{"id":99,"name":"Япония"}],"phone_codes":{"1":93,"2":355,"3":213,"4":1,"5":376,"6":244,"7":1264,"8":672,"9":1268,"10":54,"11":7,"12":297,"13":61,"14":43,"15":994,"16":1242,"17":973,"18":880,"19":1246,"20":375,"21":32,"22":501,"23":229,"24":1441,"25":975,"26":591,"27":387,"28":267,"29":47,"30":55,"31":673,"32":359,"33":226,"34":257,"35":855,"36":237,"37":1,"38":238,"39":1345,"40":236,"41":235,"42":56,"43":86,"44":61,"45":891,"46":57,"47":269,"48":242,"49":682,"50":506,"51":225,"52":385,"53":53,"54":357,"55":420,"56":45,"57":253,"58":1767,"59":1809,"60":670,"61":593,"62":20,"63":503,"64":240,"65":291,"66":372,"67":251,"68":500,"69":298,"70":679,"71":358,"72":33,"73":594,"74":689,"75":241,"76":220,"77":995,"78":49,"79":233,"80":350,"81":30,"82":299,"83":1473,"84":590,"85":1671,"86":502,"87":224,"88":592,"89":509,"90":504,"91":852,"92":36,"93":354,"94":62,"95":964,"96":353,"97":39,"98":1876,"99":81,"100":962,"101":7,"102":254,"103":686,"104":965,"105":996,"106":856,"107":371,"108":961,"109":266,"110":231,"111":218,"112":423,"113":370,"114":352,"115":853,"116":389,"117":261,"118":265,"119":60,"120":960,"121":223,"122":356,"123":692,"124":596,"125":222,"126":230,"127":269,"128":52,"129":691,"130":373,"131":377,"132":976,"133":1664,"134":212,"135":258,"136":95,"137":264,"138":674,"139":977,"140":31,"141":599,"142":687,"143":64,"144":505,"145":227,"146":234,"147":683,"148":672,"149":47,"150":968,"151":92,"152":680,"153":507,"154":675,"155":595,"156":51,"157":63,"158":64,"159":48,"160":351,"161":1,"162":974,"163":262,"164":40,"165":7,"166":250,"167":1869,"168":1758,"169":685,"170":378,"171":966,"172":221,"173":248,"174":232,"175":65,"176":421,"177":386,"178":677,"179":252,"180":27,"181":82,"182":34,"183":94,"184":290,"185":249,"186":597,"187":268,"188":46,"189":41,"190":963,"191":886,"192":992,"193":255,"194":66,"195":228,"196":690,"197":676,"198":1868,"199":216,"200":90,"201":993,"202":688,"203":256,"204":380,"205":971,"206":44,"207":598,"208":998,"209":678,"210":379,"211":58,"212":84,"213":1284,"214":1340,"215":212,"216":967,"218":260,"219":263,"220":381,"221":382,"225":91,"228":972,"229":98,"230":850,"234":1649,"235":243,"236":44,"237":44,"238":245,"239":44,"241":970,"242":239,"243":1784,"244":590,"245":1721},"currency":[{"id":5,"name":"USD"},{"id":1,"name":"EUR"},{"id":4,"name":"RUB"},{"id":2,"name":"GBP"}],"currency_enabled":0,"profile":{"avatar":"","confirmation_required":0,"popup":[],"money":{"deposit":{"min":2,"max":1000000},"withdraw":{"min":2,"max":1000000}},"user_group":"VIP","welcome_splash":0,"functions":{"popup_ids":["1"],"ext_fields":[],"is_vip_mode":0,"is_bonus_block":0,"is_no_currency_change":0,"is_trading_bonus_block":0},"finance_state":"","balance":500,"bonus_wager":0,"bonus_total_wager":0,"balance_id":7,"balance_type":1,"messages":0,"id":7,"demo":0,"public":1,"group_id":3,"name":"7 7","nickname":"Jayden Baker","currency":"USD","currency_char":"$","mask":"$%s","city":"","user_id":7,"first_name":"7","last_name":"7","phone":"7 *****00007","email":"7@test.iqoption.com","created":1380187236,"last_visit":1422364162,"site_id":1,"tz":"Pacific/Pago_Pago","locale":"ru_RU","birthdate":0,"country_id":4,"currency_id":5,"gender":"male","address":"","postal_index":"","timediff":-50400,"tz_offset":-660,"balances":[{"id":7,"type":1,"amount":500000000,"currency":"USD","new_amount":500000000,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":10663700,"type":4,"amount":406260000,"currency":"USD","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":13942830,"type":2,"amount":100000000,"currency":"USD","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":13171159,"type":2,"amount":100000000,"currency":"USD","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":88557954,"type":5,"amount":0,"currency":"BTC","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":88557956,"type":5,"amount":0,"currency":"OTN","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0},{"id":88557955,"type":5,"amount":0,"currency":"ETH","new_amount":0,"description":null,"bonus_amount":0,"bonus_total_amount":0}],"infeed":1,"confirmed_phones":[],"need_phone_confirmation":true,"rate_in_one_click":false,"deposit_in_one_click":false,"kyc_confirmed":false,"kyc":{"status":3,"isPhoneFilled":true,"isPhoneNeeded":true,"isProfileFilled":true,"isProfileNeeded":true,"isRegulatedUser":false,"daysLeftToVerify":-1,"isPhoneConfirmed":false,"isDocumentsNeeded":false,"isDocumentsApproved":false,"isDocumentsDeclined":false,"isDocumentsUploaded":false,"isDocumentPoaUploaded":false,"isDocumentPoiUploaded":false,"isDocumentsUploadSkipped":false,"isPhoneConfirmationSkipped":false},"trade_restricted":false,"auth_two_factor":false,"deposit_count":5,"is_activated":true,"new_email":"","tc":true,"trial":false,"is_islamic":false,"tin":"","personal_data_policy":{"is_call_accepted":{"status":true},"is_push_accepted":{"status":true},"is_email_accepted":{"status":true},"is_agreement_accepted":{"status":null},"is_thirdparty_accepted":{"status":true}},"client_category_id":0,"tournaments_ids":null,"socials":{},"flag":"AS","cashback_level_info":{"enabled":false},"user_circle":"No exp","skey":"1632a79b4a312e9cea4b871059ce500f","forget_status":{"status":"none","created":null,"expires":null},"account_status":"NONE"},"tz":{"Arctic/Longyearbyen":"Arctic/Longyearbyen (UTC +2:00)","Antarctica/Mawson":"Antarctica/Mawson (UTC +5:00)","Antarctica/Syowa":"Antarctica/Syowa (UTC +3:00)","Antarctica/Vostok":"Antarctica/Vostok (UTC +6:00)","Antarctica/Palmer":"Antarctica/Palmer (UTC -3:00)","Antarctica/Rothera":"Antarctica/Rothera (UTC -3:00)","Antarctica/Casey":"Antarctica/Casey (UTC +8:00)","Antarctica/Macquarie":"Antarctica/Macquarie (UTC +11:00)","Antarctica/Troll":"Antarctica/Troll (UTC +2:00)","Antarctica/DumontDUrville":"Antarctica/DumontDUrville (UTC +10:00)","Antarctica/McMurdo":"Antarctica/McMurdo (UTC +13:00)","Antarctica/Davis":"Antarctica/Davis (UTC +7:00)","Europe/Kiev":"Europe/Kiev (UTC +3:00)","Europe/Bratislava":"Europe/Bratislava (UTC +2:00)","Europe/Istanbul":"Europe/Istanbul (UTC +3:00)","Europe/Minsk":"Europe/Minsk (UTC +3:00)","Europe/Isle_of_Man":"Europe/Isle_of_Man (UTC +1:00)","Europe/Jersey":"Europe/Jersey (UTC +1:00)","Europe/Kaliningrad":"Europe/Kaliningrad (UTC +2:00)","Europe/Gibraltar":"Europe/Gibraltar (UTC +2:00)","Europe/Copenhagen":"Europe/Copenhagen (UTC +2:00)","Europe/Guernsey":"Europe/Guernsey (UTC +1:00)","Europe/Simferopol":"Europe/Simferopol (UTC +3:00)","Europe/Vatican":"Europe/Vatican (UTC +2:00)","Europe/Busingen":"Europe/Busingen (UTC +2:00)","Europe/Uzhgorod":"Europe/Uzhgorod (UTC +3:00)","Europe/Sofia":"Europe/Sofia (UTC +3:00)","Europe/Podgorica":"Europe/Podgorica (UTC +2:00)","Europe/Andorra":"Europe/Andorra (UTC +2:00)","Europe/Warsaw":"Europe/Warsaw (UTC +2:00)","Europe/Skopje":"Europe/Skopje (UTC +2:00)","Europe/Zurich":"Europe/Zurich (UTC +2:00)","Europe/Belgrade":"Europe/Belgrade (UTC +2:00)","Europe/Dublin":"Europe/Dublin (UTC +1:00)","Europe/Zagreb":"Europe/Zagreb (UTC +2:00)","Europe/Prague":"Europe/Prague (UTC +2:00)","Europe/Monaco":"Europe/Monaco (UTC +2:00)","Europe/Volgograd":"Europe/Volgograd (UTC +3:00)","Europe/Ljubljana":"Europe/Ljubljana (UTC +2:00)","Europe/Moscow":"Europe/Moscow (UTC +3:00)","Europe/Berlin":"Europe/Berlin (UTC +2:00)","Europe/Rome":"Europe/Rome (UTC +2:00)","Europe/Stockholm":"Europe/Stockholm (UTC +2:00)","Europe/Athens":"Europe/Athens (UTC +3:00)","Europe/Amsterdam":"Europe/Amsterdam (UTC +2:00)","Europe/Vaduz":"Europe/Vaduz (UTC +2:00)","Europe/Vienna":"Europe/Vienna (UTC +2:00)","Europe/Mariehamn":"Europe/Mariehamn (UTC +3:00)","Europe/San_Marino":"Europe/San_Marino (UTC +2:00)","Europe/Chisinau":"Europe/Chisinau (UTC +3:00)","Europe/Zaporozhye":"Europe/Zaporozhye (UTC +3:00)","Europe/Tirane":"Europe/Tirane (UTC +2:00)","Europe/Helsinki":"Europe/Helsinki (UTC +3:00)","Europe/Vilnius":"Europe/Vilnius (UTC +3:00)","Europe/London":"Europe/London (UTC +1:00)","Europe/Samara":"Europe/Samara (UTC +4:00)","Europe/Madrid":"Europe/Madrid (UTC +2:00)","Europe/Luxembourg":"Europe/Luxembourg (UTC +2:00)","Europe/Sarajevo":"Europe/Sarajevo (UTC +2:00)","Europe/Paris":"Europe/Paris (UTC +2:00)","Europe/Brussels":"Europe/Brussels (UTC +2:00)","Europe/Tallinn":"Europe/Tallinn (UTC +3:00)","Europe/Riga":"Europe/Riga (UTC +3:00)","Europe/Malta":"Europe/Malta (UTC +2:00)","Europe/Lisbon":"Europe/Lisbon (UTC +1:00)","Europe/Budapest":"Europe/Budapest (UTC +2:00)","Europe/Oslo":"Europe/Oslo (UTC +2:00)","Europe/Bucharest":"Europe/Bucharest (UTC +3:00)","Indian/Mayotte":"Indian/Mayotte (UTC +3:00)","Indian/Mauritius":"Indian/Mauritius (UTC +4:00)","Indian/Christmas":"Indian/Christmas (UTC +7:00)","Indian/Reunion":"Indian/Reunion (UTC +4:00)","Indian/Kerguelen":"Indian/Kerguelen (UTC +5:00)","Indian/Cocos":"Indian/Cocos (UTC +6:30)","Indian/Antananarivo":"Indian/Antananarivo (UTC +3:00)","Indian/Mahe":"Indian/Mahe (UTC +4:00)","Indian/Maldives":"Indian/Maldives (UTC +5:00)","Indian/Comoro":"Indian/Comoro (UTC +3:00)","Indian/Chagos":"Indian/Chagos (UTC +6:00)","UTC":"UTC (UTC)","Africa/Mogadishu":"Africa/Mogadishu (UTC +3:00)","Africa/Nairobi":"Africa/Nairobi (UTC +3:00)","Africa/Sao_Tome":"Africa/Sao_Tome (UTC +1:00)","Africa/Tripoli":"Africa/Tripoli (UTC +2:00)","Africa/Kinshasa":"Africa/Kinshasa (UTC +1:00)","Africa/Mbabane":"Africa/Mbabane (UTC +2:00)","Africa/Dakar":"Africa/Dakar (UTC)","Africa/Bangui":"Africa/Bangui (UTC +1:00)","Africa/Conakry":"Africa/Conakry (UTC)","Africa/Luanda":"Africa/Luanda (UTC +1:00)","Africa/Addis_Ababa":"Africa/Addis_Ababa (UTC +3:00)","Africa/Niamey":"Africa/Niamey (UTC +1:00)","Africa/Johannesburg":"Africa/Johannesburg (UTC +2:00)","Africa/Ouagadougou":"Africa/Ouagadougou (UTC)","Africa/Djibouti":"Africa/Djibouti (UTC +3:00)","Africa/Kigali":"Africa/Kigali (UTC +2:00)","Africa/Kampala":"Africa/Kampala (UTC +3:00)","Africa/Ceuta":"Africa/Ceuta (UTC +2:00)","Africa/Ndjamena":"Africa/Ndjamena (UTC +1:00)","Africa/Khartoum":"Africa/Khartoum (UTC +2:00)","Africa/Casablanca":"Africa/Casablanca (UTC +1:00)","Africa/Douala":"Africa/Douala (UTC +1:00)","Africa/Nouakchott":"Africa/Nouakchott (UTC)","Africa/Asmara":"Africa/Asmara (UTC +3:00)","Africa/Tunis":"Africa/Tunis (UTC +1:00)","Africa/Brazzaville":"Africa/Brazzaville (UTC +1:00)","Africa/El_Aaiun":"Africa/El_Aaiun (UTC +1:00)","Africa/Malabo":"Africa/Malabo (UTC +1:00)","Africa/Maputo":"Africa/Maputo (UTC +2:00)","Africa/Lome":"Africa/Lome (UTC)","Africa/Banjul":"Africa/Banjul (UTC)","Africa/Cairo":"Africa/Cairo (UTC +2:00)","Africa/Gaborone":"Africa/Gaborone (UTC +2:00)","Africa/Lusaka":"Africa/Lusaka (UTC +2:00)","Africa/Maseru":"Africa/Maseru (UTC +2:00)","Africa/Monrovia":"Africa/Monrovia (UTC)","Africa/Dar_es_Salaam":"Africa/Dar_es_Salaam (UTC +3:00)","Africa/Algiers":"Africa/Algiers (UTC +1:00)","Africa/Lubumbashi":"Africa/Lubumbashi (UTC +2:00)","Africa/Blantyre":"Africa/Blantyre (UTC +2:00)","Africa/Bujumbura":"Africa/Bujumbura (UTC +2:00)","Africa/Harare":"Africa/Harare (UTC +2:00)","Africa/Lagos":"Africa/Lagos (UTC +1:00)","Africa/Libreville":"Africa/Libreville (UTC +1:00)","Africa/Freetown":"Africa/Freetown (UTC)","Africa/Bamako":"Africa/Bamako (UTC)","Africa/Abidjan":"Africa/Abidjan (UTC)","Africa/Accra":"Africa/Accra (UTC)","Africa/Juba":"Africa/Juba (UTC +3:00)","Africa/Porto-Novo":"Africa/Porto-Novo (UTC +1:00)","Africa/Bissau":"Africa/Bissau (UTC)","Africa/Windhoek":"Africa/Windhoek (UTC +2:00)","America/Edmonton":"America/Edmonton (UTC -6:00)","America/Tegucigalpa":"America/Tegucigalpa (UTC -6:00)","America/Chicago":"America/Chicago (UTC -5:00)","America/Cayman":"America/Cayman (UTC -5:00)","America/Swift_Current":"America/Swift_Current (UTC -6:00)","America/North_Dakota/New_Salem":"America/North_Dakota/New_Salem (UTC -5:00)","America/North_Dakota/Beulah":"America/North_Dakota/Beulah (UTC -5:00)","America/North_Dakota/Center":"America/North_Dakota/Center (UTC -5:00)","America/Nome":"America/Nome (UTC -8:00)","America/Mexico_City":"America/Mexico_City (UTC -5:00)","America/Barbados":"America/Barbados (UTC -4:00)","America/Regina":"America/Regina (UTC -6:00)","America/Rainy_River":"America/Rainy_River (UTC -5:00)","America/Santo_Domingo":"America/Santo_Domingo (UTC -4:00)","America/Guyana":"America/Guyana (UTC -4:00)","America/Halifax":"America/Halifax (UTC -3:00)","America/Asuncion":"America/Asuncion (UTC -3:00)","America/Iqaluit":"America/Iqaluit (UTC -4:00)","America/Merida":"America/Merida (UTC -5:00)","America/Vancouver":"America/Vancouver (UTC -7:00)","America/Bahia":"America/Bahia (UTC -3:00)","America/Mazatlan":"America/Mazatlan (UTC -6:00)","America/Panama":"America/Panama (UTC -5:00)","America/St_Thomas":"America/St_Thomas (UTC -4:00)","America/Sitka":"America/Sitka (UTC -8:00)","America/Godthab":"America/Godthab (UTC -2:00)","America/Nipigon":"America/Nipigon (UTC -4:00)","America/Resolute":"America/Resolute (UTC -5:00)","America/Manaus":"America/Manaus (UTC -4:00)","America/Matamoros":"America/Matamoros (UTC -5:00)","America/Juneau":"America/Juneau (UTC -8:00)","America/Menominee":"America/Menominee (UTC -5:00)","America/Bogota":"America/Bogota (UTC -5:00)","America/Dominica":"America/Dominica (UTC -4:00)","America/Inuvik":"America/Inuvik (UTC -6:00)","America/Bahia_Banderas":"America/Bahia_Banderas (UTC -5:00)","America/Thule":"America/Thule (UTC -3:00)","America/Hermosillo":"America/Hermosillo (UTC -7:00)","America/St_Johns":"America/St_Johns (UTC -2:30)","America/Santarem":"America/Santarem (UTC -3:00)","America/Creston":"America/Creston (UTC -7:00)","America/Campo_Grande":"America/Campo_Grande (UTC -4:00)","America/Adak":"America/Adak (UTC -9:00)","America/Caracas":"America/Caracas (UTC -4:00)","America/St_Kitts":"America/St_Kitts (UTC -4:00)","America/Cancun":"America/Cancun (UTC -5:00)","America/Managua":"America/Managua (UTC -6:00)","America/Dawson_Creek":"America/Dawson_Creek (UTC -7:00)","America/Recife":"America/Recife (UTC -3:00)","America/Eirunepe":"America/Eirunepe (UTC -5:00)","America/Grenada":"America/Grenada (UTC -4:00)","America/Blanc-Sablon":"America/Blanc-Sablon (UTC -4:00)","America/La_Paz":"America/La_Paz (UTC -4:00)","America/Miquelon":"America/Miquelon (UTC -2:00)","America/Noronha":"America/Noronha (UTC -2:00)","America/Montevideo":"America/Montevideo (UTC -3:00)","America/Grand_Turk":"America/Grand_Turk (UTC -4:00)","America/Tortola":"America/Tortola (UTC -4:00)","America/Cambridge_Bay":"America/Cambridge_Bay (UTC -6:00)","America/Havana":"America/Havana (UTC -4:00)","America/Denver":"America/Denver (UTC -6:00)","America/Guatemala":"America/Guatemala (UTC -6:00)","America/Araguaina":"America/Araguaina (UTC -3:00)","America/Argentina/Buenos_Aires":"America/Argentina/Buenos_Aires (UTC -3:00)","America/Argentina/Cordoba":"America/Argentina/Cordoba (UTC -3:00)","America/Argentina/La_Rioja":"America/Argentina/La_Rioja (UTC -3:00)","America/Argentina/Salta":"America/Argentina/Salta (UTC -3:00)","America/Argentina/Rio_Gallegos":"America/Argentina/Rio_Gallegos (UTC -3:00)","America/Argentina/Mendoza":"America/Argentina/Mendoza (UTC -3:00)","America/Argentina/Jujuy":"America/Argentina/Jujuy (UTC -3:00)","America/Argentina/Ushuaia":"America/Argentina/Ushuaia (UTC -3:00)","America/Argentina/San_Juan":"America/Argentina/San_Juan (UTC -3:00)","America/Argentina/San_Luis":"America/Argentina/San_Luis (UTC -3:00)","America/Argentina/Catamarca":"America/Argentina/Catamarca (UTC -3:00)","America/Argentina/Tucuman":"America/Argentina/Tucuman (UTC -3:00)","America/Danmarkshavn":"America/Danmarkshavn (UTC)","America/Fort_Nelson":"America/Fort_Nelson (UTC -7:00)","America/El_Salvador":"America/El_Salvador (UTC -6:00)","America/Dawson":"America/Dawson (UTC -7:00)","America/Scoresbysund":"America/Scoresbysund (UTC)","America/Phoenix":"America/Phoenix (UTC -7:00)","America/New_York":"America/New_York (UTC -4:00)","America/Fortaleza":"America/Fortaleza (UTC -3:00)","America/Jamaica":"America/Jamaica (UTC -5:00)","America/St_Lucia":"America/St_Lucia (UTC -4:00)","America/Lower_Princes":"America/Lower_Princes (UTC -4:00)","America/Marigot":"America/Marigot (UTC -4:00)","America/Santiago":"America/Santiago (UTC -3:00)","America/Belize":"America/Belize (UTC -6:00)","America/Boise":"America/Boise (UTC -6:00)","America/Martinique":"America/Martinique (UTC -4:00)","America/Yellowknife":"America/Yellowknife (UTC -6:00)","America/Maceio":"America/Maceio (UTC -3:00)","America/Monterrey":"America/Monterrey (UTC -5:00)","America/St_Vincent":"America/St_Vincent (UTC -4:00)","America/Detroit":"America/Detroit (UTC -4:00)","America/Toronto":"America/Toronto (UTC -4:00)","America/Anchorage":"America/Anchorage (UTC -8:00)","America/Rankin_Inlet":"America/Rankin_Inlet (UTC -5:00)","America/Kralendijk":"America/Kralendijk (UTC -4:00)","America/Goose_Bay":"America/Goose_Bay (UTC -3:00)","America/Antigua":"America/Antigua (UTC -4:00)","America/Anguilla":"America/Anguilla (UTC -4:00)","America/Porto_Velho":"America/Porto_Velho (UTC -4:00)","America/Yakutat":"America/Yakutat (UTC -8:00)","America/Chihuahua":"America/Chihuahua (UTC -6:00)","America/Los_Angeles":"America/Los_Angeles (UTC -7:00)","America/Glace_Bay":"America/Glace_Bay (UTC -3:00)","America/Boa_Vista":"America/Boa_Vista (UTC -4:00)","America/Montserrat":"America/Montserrat (UTC -4:00)","America/Sao_Paulo":"America/Sao_Paulo (UTC -3:00)","America/Moncton":"America/Moncton (UTC -3:00)","America/Thunder_Bay":"America/Thunder_Bay (UTC -4:00)","America/Whitehorse":"America/Whitehorse (UTC -7:00)","America/Rio_Branco":"America/Rio_Branco (UTC -5:00)","America/Port_of_Spain":"America/Port_of_Spain (UTC -4:00)","America/Metlakatla":"America/Metlakatla (UTC -8:00)","America/Costa_Rica":"America/Costa_Rica (UTC -6:00)","America/Lima":"America/Lima (UTC -5:00)","America/Kentucky/Louisville":"America/Kentucky/Louisville (UTC -4:00)","America/Kentucky/Monticello":"America/Kentucky/Monticello (UTC -4:00)","America/Cayenne":"America/Cayenne (UTC -3:00)","America/Paramaribo":"America/Paramaribo (UTC -3:00)","America/Ojinaga":"America/Ojinaga (UTC -6:00)","America/Curacao":"America/Curacao (UTC -4:00)","America/St_Barthelemy":"America/St_Barthelemy (UTC -4:00)","America/Belem":"America/Belem (UTC -3:00)","America/Tijuana":"America/Tijuana (UTC -7:00)","America/Aruba":"America/Aruba (UTC -4:00)","America/Guayaquil":"America/Guayaquil (UTC -5:00)","America/Winnipeg":"America/Winnipeg (UTC -5:00)","America/Guadeloupe":"America/Guadeloupe (UTC -4:00)","America/Atikokan":"America/Atikokan (UTC -5:00)","America/Puerto_Rico":"America/Puerto_Rico (UTC -4:00)","America/Nassau":"America/Nassau (UTC -4:00)","America/Port-au-Prince":"America/Port-au-Prince (UTC -4:00)","America/Cuiaba":"America/Cuiaba (UTC -4:00)","America/Pangnirtung":"America/Pangnirtung (UTC -4:00)","America/Indiana/Vevay":"America/Indiana/Vevay (UTC -4:00)","America/Indiana/Vincennes":"America/Indiana/Vincennes (UTC -4:00)","America/Indiana/Marengo":"America/Indiana/Marengo (UTC -4:00)","America/Indiana/Indianapolis":"America/Indiana/Indianapolis (UTC -4:00)","America/Indiana/Winamac":"America/Indiana/Winamac (UTC -4:00)","America/Indiana/Knox":"America/Indiana/Knox (UTC -5:00)","America/Indiana/Tell_City":"America/Indiana/Tell_City (UTC -5:00)","America/Indiana/Petersburg":"America/Indiana/Petersburg (UTC -4:00)","Asia/Nicosia":"Asia/Nicosia (UTC +3:00)","Asia/Qatar":"Asia/Qatar (UTC +3:00)","Asia/Hovd":"Asia/Hovd (UTC +7:00)","Asia/Seoul":"Asia/Seoul (UTC +9:00)","Asia/Magadan":"Asia/Magadan (UTC +11:00)","Asia/Dhaka":"Asia/Dhaka (UTC +6:00)","Asia/Ho_Chi_Minh":"Asia/Ho_Chi_Minh (UTC +7:00)","Asia/Pontianak":"Asia/Pontianak (UTC +7:00)","Asia/Tashkent":"Asia/Tashkent (UTC +5:00)","Asia/Tbilisi":"Asia/Tbilisi (UTC +4:00)","Asia/Aqtau":"Asia/Aqtau (UTC +5:00)","Asia/Yekaterinburg":"Asia/Yekaterinburg (UTC +5:00)","Asia/Sakhalin":"Asia/Sakhalin (UTC +11:00)","Asia/Yerevan":"Asia/Yerevan (UTC +4:00)","Asia/Novosibirsk":"Asia/Novosibirsk (UTC +7:00)","Asia/Dushanbe":"Asia/Dushanbe (UTC +5:00)","Asia/Ust-Nera":"Asia/Ust-Nera (UTC +10:00)","Asia/Samarkand":"Asia/Samarkand (UTC +5:00)","Asia/Beirut":"Asia/Beirut (UTC +3:00)","Asia/Almaty":"Asia/Almaty (UTC +6:00)","Asia/Hebron":"Asia/Hebron (UTC +3:00)","Asia/Jayapura":"Asia/Jayapura (UTC +9:00)","Asia/Damascus":"Asia/Damascus (UTC +3:00)","Asia/Anadyr":"Asia/Anadyr (UTC +12:00)","Asia/Urumqi":"Asia/Urumqi (UTC +6:00)","Asia/Thimphu":"Asia/Thimphu (UTC +6:00)","Asia/Taipei":"Asia/Taipei (UTC +8:00)","Asia/Tehran":"Asia/Tehran (UTC +3:30)","Asia/Khandyga":"Asia/Khandyga (UTC +9:00)","Asia/Kuala_Lumpur":"Asia/Kuala_Lumpur (UTC +8:00)","Asia/Qyzylorda":"Asia/Qyzylorda (UTC +6:00)","Asia/Shanghai":"Asia/Shanghai (UTC +8:00)","Asia/Baghdad":"Asia/Baghdad (UTC +3:00)","Asia/Omsk":"Asia/Omsk (UTC +6:00)","Asia/Vladivostok":"Asia/Vladivostok (UTC +10:00)","Asia/Kamchatka":"Asia/Kamchatka (UTC +12:00)","Asia/Riyadh":"Asia/Riyadh (UTC +3:00)","Asia/Manila":"Asia/Manila (UTC +8:00)","Asia/Amman":"Asia/Amman (UTC +3:00)","Asia/Ulaanbaatar":"Asia/Ulaanbaatar (UTC +8:00)","Asia/Krasnoyarsk":"Asia/Krasnoyarsk (UTC +7:00)","Asia/Macau":"Asia/Macau (UTC +8:00)","Asia/Irkutsk":"Asia/Irkutsk (UTC +8:00)","Asia/Muscat":"Asia/Muscat (UTC +4:00)","Asia/Brunei":"Asia/Brunei (UTC +8:00)","Asia/Choibalsan":"Asia/Choibalsan (UTC +8:00)","Asia/Srednekolymsk":"Asia/Srednekolymsk (UTC +11:00)","Asia/Novokuznetsk":"Asia/Novokuznetsk (UTC +7:00)","Asia/Dubai":"Asia/Dubai (UTC +4:00)","Asia/Tokyo":"Asia/Tokyo (UTC +9:00)","Asia/Kuwait":"Asia/Kuwait (UTC +3:00)","Asia/Kathmandu":"Asia/Kathmandu (UTC +5:45)","Asia/Bahrain":"Asia/Bahrain (UTC +3:00)","Asia/Yakutsk":"Asia/Yakutsk (UTC +9:00)","Asia/Singapore":"Asia/Singapore (UTC +8:00)","Asia/Makassar":"Asia/Makassar (UTC +8:00)","Asia/Ashgabat":"Asia/Ashgabat (UTC +5:00)","Asia/Aqtobe":"Asia/Aqtobe (UTC +5:00)","Asia/Colombo":"Asia/Colombo (UTC +5:30)","Asia/Pyongyang":"Asia/Pyongyang (UTC +9:00)","Asia/Kolkata":"Asia/Kolkata (UTC +5:30)","Asia/Bangkok":"Asia/Bangkok (UTC +7:00)","Asia/Hong_Kong":"Asia/Hong_Kong (UTC +8:00)","Asia/Baku":"Asia/Baku (UTC +4:00)","Asia/Kuching":"Asia/Kuching (UTC +8:00)","Asia/Aden":"Asia/Aden (UTC +3:00)","Asia/Jakarta":"Asia/Jakarta (UTC +7:00)","Asia/Jerusalem":"Asia/Jerusalem (UTC +3:00)","Asia/Vientiane":"Asia/Vientiane (UTC +7:00)","Asia/Kabul":"Asia/Kabul (UTC +4:30)","Asia/Gaza":"Asia/Gaza (UTC +3:00)","Asia/Bishkek":"Asia/Bishkek (UTC +6:00)","Asia/Phnom_Penh":"Asia/Phnom_Penh (UTC +7:00)","Asia/Karachi":"Asia/Karachi (UTC +5:00)","Asia/Chita":"Asia/Chita (UTC +9:00)","Asia/Oral":"Asia/Oral (UTC +5:00)","Asia/Dili":"Asia/Dili (UTC +9:00)","Pacific/Majuro":"Pacific/Majuro (UTC +12:00)","Pacific/Niue":"Pacific/Niue (UTC -11:00)","Pacific/Pago_Pago":"Pacific/Pago_Pago (UTC -11:00)","Pacific/Wallis":"Pacific/Wallis (UTC +12:00)","Pacific/Chuuk":"Pacific/Chuuk (UTC +10:00)","Pacific/Rarotonga":"Pacific/Rarotonga (UTC -10:00)","Pacific/Gambier":"Pacific/Gambier (UTC -9:00)","Pacific/Kosrae":"Pacific/Kosrae (UTC +11:00)","Pacific/Auckland":"Pacific/Auckland (UTC +13:00)","Pacific/Kiritimati":"Pacific/Kiritimati (UTC +14:00)","Pacific/Marquesas":"Pacific/Marquesas (UTC -9:30)","Pacific/Funafuti":"Pacific/Funafuti (UTC +12:00)","Pacific/Tahiti":"Pacific/Tahiti (UTC -10:00)","Pacific/Nauru":"Pacific/Nauru (UTC +12:00)","Pacific/Kwajalein":"Pacific/Kwajalein (UTC +12:00)","Pacific/Pohnpei":"Pacific/Pohnpei (UTC +11:00)","Pacific/Norfolk":"Pacific/Norfolk (UTC +11:00)","Pacific/Pitcairn":"Pacific/Pitcairn (UTC -8:00)","Pacific/Bougainville":"Pacific/Bougainville (UTC +11:00)","Pacific/Saipan":"Pacific/Saipan (UTC +10:00)","Pacific/Guadalcanal":"Pacific/Guadalcanal (UTC +11:00)","Pacific/Midway":"Pacific/Midway (UTC -11:00)","Pacific/Port_Moresby":"Pacific/Port_Moresby (UTC +10:00)","Pacific/Fakaofo":"Pacific/Fakaofo (UTC +13:00)","Pacific/Tarawa":"Pacific/Tarawa (UTC +12:00)","Pacific/Easter":"Pacific/Easter (UTC -5:00)","Pacific/Fiji":"Pacific/Fiji (UTC +12:00)","Pacific/Enderbury":"Pacific/Enderbury (UTC +13:00)","Pacific/Noumea":"Pacific/Noumea (UTC +11:00)","Pacific/Apia":"Pacific/Apia (UTC +14:00)","Pacific/Guam":"Pacific/Guam (UTC +10:00)","Pacific/Palau":"Pacific/Palau (UTC +9:00)","Pacific/Tongatapu":"Pacific/Tongatapu (UTC +13:00)","Pacific/Efate":"Pacific/Efate (UTC +11:00)","Pacific/Galapagos":"Pacific/Galapagos (UTC -6:00)","Pacific/Chatham":"Pacific/Chatham (UTC +13:45)","Pacific/Wake":"Pacific/Wake (UTC +12:00)","Pacific/Honolulu":"Pacific/Honolulu (UTC -10:00)","Australia/Brisbane":"Australia/Brisbane (UTC +10:00)","Australia/Currie":"Australia/Currie (UTC +11:00)","Australia/Sydney":"Australia/Sydney (UTC +11:00)","Australia/Lord_Howe":"Australia/Lord_Howe (UTC +11:00)","Australia/Adelaide":"Australia/Adelaide (UTC +10:30)","Australia/Melbourne":"Australia/Melbourne (UTC +11:00)","Australia/Perth":"Australia/Perth (UTC +8:00)","Australia/Darwin":"Australia/Darwin (UTC +9:30)","Australia/Eucla":"Australia/Eucla (UTC +8:45)","Australia/Hobart":"Australia/Hobart (UTC +11:00)","Australia/Broken_Hill":"Australia/Broken_Hill (UTC +10:30)","Australia/Lindeman":"Australia/Lindeman (UTC +10:00)","Atlantic/St_Helena":"Atlantic/St_Helena (UTC)","Atlantic/Stanley":"Atlantic/Stanley (UTC -3:00)","Atlantic/Faroe":"Atlantic/Faroe (UTC +1:00)","Atlantic/Madeira":"Atlantic/Madeira (UTC +1:00)","Atlantic/South_Georgia":"Atlantic/South_Georgia (UTC -2:00)","Atlantic/Bermuda":"Atlantic/Bermuda (UTC -3:00)","Atlantic/Reykjavik":"Atlantic/Reykjavik (UTC)","Atlantic/Canary":"Atlantic/Canary (UTC +1:00)","Atlantic/Cape_Verde":"Atlantic/Cape_Verde (UTC -1:00)","Atlantic/Azores":"Atlantic/Azores (UTC)"},"address":"","postal_index":"","city":"","nationality":"","questions":[],"rate_in_one_click":false,"deposit_in_one_click":false,"social_key":"798d7697ec94661861c8c5dfd2c75bb2","_config":{"method":"GET","transformRequest":[null],"transformResponse":[null],"withCredentials":true,"url":"http://build40515.sandbox3.mobbtech.com/api/register/getregdata","headers":{"Accept":"application/json, text/plain, */*"},"requestTimestamp":1540471986522,"responseTimestamp":1540471991855,"timeDiff":5333}};
            user = angular.copy(_setRealBalance(data));
            var response = keyName ? user[keyName] : user;
            return $q.resolve(response);
            // return httpService(config).then(
            //     function (response) {
            //         console.log(JSON.stringify(response));
            //         if (response) {
            //             user = angular.copy(_setRealBalance(response));
            //             return keyName ? user[keyName] : user;
            //         } else {
            //             return $q.reject();
            //         }
            //     },
            //     function (data) {
            //         return data;
            //     }
            // );
        }
    }
})();