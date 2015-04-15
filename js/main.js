var csi = new CSInterface();
var extPath = decodeURI(CSInterface.prototype.getSystemPath(SystemPath.EXTENSION));
var assetsPath = extPath + '/assets';



function checkGender() {
    if (document.getElementById('gender1').checked) {
        gender = document.getElementById('gender1').value;
    }
    if (document.getElementById('gender2').checked) {
        gender = document.getElementById('gender2').value;
    }
    if (document.getElementById('gender3').checked) {
        gender = document.getElementById('gender3').value;
    }
    return gender;
}


var namesEn = {
        "country": "United States",
        "male": ["Aaron", "Adam", "Alan", "Albert", "Alexander", "Andrew", "Anthony", "Arthur", "Austin", "Benjamin", "Billy", "Bobby", "Brandon", "Brian", "Bruce", "Bryan", "Carl", "Charles", "Christian", "Christopher", "Craig", "Daniel", "David", "Dennis", "Donald", "Douglas", "Dylan", "Edward", "Eric", "Ethan", "Eugene", "Frank", "Gary", "George", "Gerald", "Gregory", "Harold", "Harry", "Henry", "Howard", "Jack", "Jacob", "James", "Jason", "Jeffrey", "Jeremy", "Jerry", "Jesse", "Joe", "John", "Johnny", "Jonathan", "Jordan", "Jose", "Joseph", "Joshua", "Juan", "Justin", "Keith", "Kenneth", "Kevin", "Kyle", "Larry", "Lawrence", "Louis", "Mark", "Matthew", "Michael", "Nathan", "Nicholas", "Patrick", "Paul", "Peter", "Philip", "Phillip", "Ralph", "Randy", "Raymond", "Richard", "Robert", "Roger", "Ronald", "Roy", "Russell", "Ryan", "Samuel", "Scott", "Sean", "Stephen", "Steven", "Terry", "Thomas", "Timothy", "Tyler", "Vincent", "Walter", "Wayne", "William", "Willie", "Zachary"],
        "female": ["Alice", "Amanda", "Amber", "Amy", "Andrea", "Angela", "Ann", "Anna", "Ashley", "Barbara", "Betty", "Beverly", "Brenda", "Brittany", "Carol", "Carolyn", "Catherine", "Cheryl", "Christina", "Christine", "Crystal", "Cynthia", "Danielle", "Deborah", "Debra", "Denise", "Diana", "Diane", "Donna", "Doris", "Dorothy", "Elizabeth", "Emily", "Emma", "Evelyn", "Frances", "Gloria", "Grace", "Hannah", "Heather", "Helen", "Jacqueline", "Jane", "Janet", "Janice", "Jean", "Jennifer", "Jessica", "Joan", "Joyce", "Judith", "Judy", "Julia", "Julie", "Karen", "Katherine", "Kathleen", "Kathryn", "Kathy", "Kelly", "Kimberly", "Laura", "Lauren", "Linda", "Lisa", "Lori", "Madison", "Margaret", "Maria", "Marie", "Marilyn", "Martha", "Mary", "Megan", "Melissa", "Michelle", "Mildred", "Nancy", "Nicole", "Olivia", "Pamela", "Patricia", "Rachel", "Rebecca", "Rose", "Ruth", "Samantha", "Sandra", "Sara", "Sarah", "Sharon", "Shirley", "Stephanie", "Susan", "Tammy", "Teresa", "Theresa", "Tiffany", "Victoria", "Virginia"],
        "surnames": ["Adams", "Aguilar", "Alexander", "Allen", "Alvarado", "Alvarez", "Anderson", "Andrews", "Armstrong", "Arnold", "Austin", "Bailey", "Baker", "Banks", "Barnes", "Barnett", "Barrett", "Bates", "Beck", "Bell", "Bennett", "Berry", "Bishop", "Black", "Bowman", "Boyd", "Bradley", "Brewer", "Brooks", "Brown", "Bryant", "Burke", "Burns", "Burton", "Butler", "Campbell", "Carlson", "Carpenter", "Carr", "Carroll", "Carter", "Castillo", "Castro", "Chapman", "Chavez", "Chen", "Clark", "Cole", "Coleman", "Collins", "Contreras", "Cook", "Cooper", "Cox", "Crawford", "Cruz", "Cunningham", "Curtis", "Daniels", "Davidson", "Davis", "Day", "Dean", "Delgado", "Diaz", "Dixon", "Douglas", "Duncan", "Dunn", "Edwards", "Elliott", "Ellis", "Estrada", "Evans", "Ferguson", "Fernandez", "Fields", "Fisher", "Flores", "Ford", "Foster", "Fowler", "Fox", "Franklin", "Freeman", "Fuller", "Garcia", "Gardner", "Garrett", "Garza", "George", "Gibson", "Gilbert", "Gomez", "Gonzales", "Gonzalez", "Gordon", "Graham", "Grant", "Gray", "Green", "Greene", "Griffin", "Guerrero", "Gutierrez", "Guzman", "Hall", "Hamilton", "Hansen", "Hanson", "Harper", "Harris", "Harrison", "Hart", "Harvey", "Hawkins", "Hayes", "Henderson", "Henry", "Hernandez", "Herrera", "Hicks", "Hill", "Hoffman", "Holland", "Holmes", "Hopkins", "Howard", "Howell", "Hudson", "Hughes", "Hunt", "Hunter", "Jackson", "Jacobs", "James", "Jenkins", "Jensen", "Jimenez", "Johnson", "Johnston", "Jones", "Jordan", "Keller", "Kelley", "Kelly", "Kennedy", "Kim", "King", "Knight", "Lane", "Larson", "Lawrence", "Lawson", "Lee", "Lewis", "Little", "Long", "Lopez", "Lucas", "Lynch", "Marshall", "Martin", "Martinez", "Mason", "Matthews", "May", "McCoy", "McDonald", "Medina", "Mendez", "Mendoza", "Meyer", "Miller", "Mills", "Mitchell", "Montgomery", "Moore", "Morales", "Moreno", "Morgan", "Morris", "Morrison", "Munoz", "Murphy", "Murray", "Myers", "Nelson", "Newman", "Nguyen", "Nichols", "Obrien", "Oliver", "Olson", "Ortega", "Ortiz", "Owens", "Palmer", "Parker", "Patel", "Patterson", "Payne", "Pearson", "Pena", "Perez", "Perkins", "Perry", "Peters", "Peterson", "Phillips", "Pierce", "Porter", "Powell", "Price", "Ramirez", "Ramos", "Ray", "Reed", "Reid", "Reyes", "Reynolds", "Rice", "Richards", "Richardson", "Riley", "Rios", "Rivera", "Roberts", "Robertson", "Robinson", "Rodriguez", "Rogers", "Romero", "Rose", "Ross", "Ruiz", "Russell", "Ryan", "Salazar", "Sanchez", "Sanders", "Sandoval", "Santos", "Schmidt", "Schneider", "Schultz", "Scott", "Shaw", "Silva", "Simmons", "Simpson", "Sims", "Smith", "Snyder", "Soto", "Spencer", "Stanley", "Stephens", "Stevens", "Stewart", "Stone", "Sullivan", "Taylor", "Thomas", "Thompson", "Torres", "Tran", "Tucker", "Turner", "Valdez", "Vargas", "Vasquez", "Wade", "Wagner", "Walker", "Wallace", "Walsh", "Walters", "Ward", "Warren", "Washington", "Watkins", "Watson", "Weaver", "Webb", "Weber", "Welch", "Wells", "West", "Wheeler", "White", "Williams", "Williamson", "Willis", "Wilson", "Wong", "Wood", "Woods", "Wright", "Young"]
    };


////////////////////////////////////////////
// Refresh extension
////////////////////////////////////////////
function refreshExt() {
    var selectedGender = checkGender();
    
    if (selectedGender == 'both') {
        var both = [];
        csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + 1 + ')', function (both) {
            if (both == 1) {
                var namesMax = namesEn.female.length - 1,
                    surnamesMax = namesEn.surnames.length - 1;
                csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + namesMax + ')', function (resN) {
                    csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + surnamesMax + ')', function (resS) {
                        var name = namesEn.female[resN],
                            surname = namesEn.surnames[resS],
                            fio = name + " " + surname;

                        $('#username').val(fio);

                    });
                });
                var randomImageId = [];
                csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + 95 + ')', function (randomImageId) {
                    var imgPath = "./assets/1000faces/women/" + randomImageId + ".jpg";

                    $('#image').css({
                        'background-image': 'url("' + imgPath + '")'
                    });

                    imgPath = assetsPath + "/1000faces/women/" + randomImageId + ".jpg";
                    $('#image').data("url", imgPath);
                });
            } else {
                var namesMax = namesEn.male.length - 1,
                    surnamesMax = namesEn.surnames.length - 1;
                csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + namesMax + ')', function (resN) {
                    csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + surnamesMax + ')', function (resS) {
                        var name = namesEn.male[resN],
                            surname = namesEn.surnames[resS],
                            fio = name + " " + surname;

                        $('#username').val(fio);

                    });
                });
                var randomImageId = [];
                csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + 95 + ')', function (randomImageId) {
                    var imgPath = "./assets/1000faces/men/" + randomImageId + ".jpg";

                    $('#image').css({
                        'background-image': 'url("' + imgPath + '")'
                    });

                    imgPath = assetsPath + "/1000faces/men/" + randomImageId + ".jpg";
                    $('#image').data("url", imgPath);
                });
            }
        });


    } else if (selectedGender == 'men') {
        var namesMax = namesEn.male.length - 1,
            surnamesMax = namesEn.surnames.length - 1;
        csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + namesMax + ')', function (resN) {
            csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + surnamesMax + ')', function (resS) {
                var name = namesEn.male[resN],
                    surname = namesEn.surnames[resS],
                    fio = name + " " + surname;

                $('#username').val(fio);

            });
        });
        var randomImageId = [];
        csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + 95 + ')', function (randomImageId) {
            var imgPath = "./assets/1000faces/men/" + randomImageId + ".jpg";

            $('#image').css({
                'background-image': 'url("' + imgPath + '")'
            });

            imgPath = assetsPath + "/1000faces/men/" + randomImageId + ".jpg";
            $('#image').data("url", imgPath);
        });


    } else {
        var namesMax = namesEn.female.length - 1,
            surnamesMax = namesEn.surnames.length - 1;
        csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + namesMax + ')', function (resN) {
            csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + surnamesMax + ')', function (resS) {
                var name = namesEn.female[resN],
                    surname = namesEn.surnames[resS],
                    fio = name + " " + surname;

                $('#username').val(fio);

            });
        });
        var randomImageId = [];
        csi.evalScript('getRandomNumber(' + 1 + ', ' + 0 + ', ' + 95 + ')', function (randomImageId) {
            var imgPath = "./assets/1000faces/women/" + randomImageId + ".jpg";

            $('#image').css({
                'background-image': 'url("' + imgPath + '")'
            });

            imgPath = assetsPath + "/1000faces/women/" + randomImageId + ".jpg";
            $('#image').data("url", imgPath);
        });
    }

}

$(document).ready(function () {
    refreshExt();
});

$('#image').on('click', function () {
    refreshExt();
});

$('.genderSel').change(function(){
    refreshExt();
});

$('#single').on('click', function () {
    var imgPath = $('#image').data("url");
    csi.evalScript('startSingle("' + imgPath + '")');
    refreshExt();
});

$('#multi').on('click', function () {
    var selectedGender = checkGender();
    var imgPath = $('#image').data("url");
    csi.evalScript('startMulti("' + selectedGender + '", "' + imgPath + '", "' + assetsPath + '")');
    refreshExt();
});