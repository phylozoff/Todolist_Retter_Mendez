/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
    };

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });
  },

  ////////////////////////////
  // Menu Page Controller //
  ////////////////////////////

  menuPage: function(page) {

    //Sans catégorie
    page.querySelector('[input-id="r-no"]').onclick = function(){
        var pendingList = document.querySelector('#pending-list');
                        var a = [];
                        var child = pendingList.children;
                        for (var i = 0; i < child.length; i++) {
                            a.push(child[i]);
                        }
                        for (var i = 0; i < a.length; i++) {
                            pendingList.removeChild(a[i]);
                        }
        var regex = /[[:space:]]*/;
        var tabData = JSON.parse(storage.getItem("data"));
                tabData.forEach((data)=>{
                    if(data.category.match(regex)==null){

                    var checkbox = '<ons-checkbox></ons-checkbox>';
                          if(data.checked){
                            checkbox = '<ons-checkbox checked></ons-checkbox>';
                          }
                    var taskItem = ons.createElement(
                                    //'<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
                                    '<ons-list-item tappable category="' + data.category + '">' +
                                    '<label class="left">' +
                                    checkbox +
                                    '</label>' +
                                    '<div class="center">' +
                                    data.title +
                                    '</div>' +
                                    '<div class="right">' +
                                    '<ons-button class="passEnCours">En cours</ons-button>' +
                                    '<ons-button class="passFinie">Finie</ons-button>' +
                                    '<ons-icon class="suppr" style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
                                    '</div>' +
                                    '</ons-list-item>'
                                  );

                                  // Store data within the element.
                                  taskItem.data = data;

                                  var pendingList = document.querySelector('#pending-list');
                                  pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);

                // Add 'completion' functionality when the checkbox changes.
                      taskItem.data.onCheckboxChange = function(event) {
                        var tabData = JSON.parse(storage.getItem("data"));
                        tabData.map((x)=>{
                          if(x.title==taskItem.data.title){x.checked=!x.checked}
                        });
                        storage.setItem("data",JSON.stringify(tabData));
                      };

                      taskItem.addEventListener('change', taskItem.data.onCheckboxChange);

                      // Add button functionality to remove a task.
                      taskItem.querySelector('.suppr').onclick = function() {
                        myApp.services.remove(taskItem);
                      };

                      taskItem.querySelector('.passEnCours').onclick = function() {
                        myApp.services.passageEnCours(taskItem);
                      };
                      taskItem.querySelector('.passFinie').onclick = function() {
                        myApp.services.passageFinie(taskItem);
                      };


                }
                });


    };

    //Toutes les catégories
    page.querySelector('[input-id="r-all"]').onclick = function(){
        var pendingList = document.querySelector('#pending-list');
                var a = [];
                var child = pendingList.children;
                for (var i = 0; i < child.length; i++) {
                    a.push(child[i]);
                }
                for (var i = 0; i < a.length; i++) {
                    pendingList.removeChild(a[i]);
                }
        var tabData = JSON.parse(storage.getItem("data"));
        tabData.forEach((data)=>{
            var checkbox = '<ons-checkbox></ons-checkbox>';
                  if(data.checked){
                    checkbox = '<ons-checkbox checked></ons-checkbox>';
                  }
            var taskItem = ons.createElement(
                            //'<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
                            '<ons-list-item tappable category="' + data.category + '">' +
                            '<label class="left">' +
                            checkbox +
                            '</label>' +
                            '<div class="center">' +
                            data.title +
                            '</div>' +
                            '<div class="right">' +
                            '<ons-button class="passEnCours">En cours</ons-button>' +
                            '<ons-button class="passFinie">Finie</ons-button>' +
                            '<ons-icon class="suppr" style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
                            '</div>' +
                            '</ons-list-item>'
                          );

                          // Store data within the element.
                          taskItem.data = data;

                          var pendingList = document.querySelector('#pending-list');
                          pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);

            // Add 'completion' functionality when the checkbox changes.
                                  taskItem.data.onCheckboxChange = function(event) {
                                    var tabData = JSON.parse(storage.getItem("data"));
                                    tabData.map((x)=>{
                                      if(x.title==taskItem.data.title){x.checked=!x.checked}
                                    });
                                    storage.setItem("data",JSON.stringify(tabData));
                                  };

                                  taskItem.addEventListener('change', taskItem.data.onCheckboxChange);

                                  // Add button functionality to remove a task.
                                  taskItem.querySelector('.suppr').onclick = function() {
                                    myApp.services.remove(taskItem);
                                  };

                                  taskItem.querySelector('.passEnCours').onclick = function() {
                                    myApp.services.passageEnCours(taskItem);
                                  };
                                  taskItem.querySelector('.passFinie').onclick = function() {
                                    myApp.services.passageFinie(taskItem);
                                  };


        });


    };



    //Catégorie spécifique
    var tabData = JSON.parse(storage.getItem("data"));
    var tab2 = [];
    tabData.forEach((x) => {
        var cat = x.category;
        if(!tab2.includes(cat)){tab2.push(cat);}
    });
    var id = 0;
    tab2.forEach(function (data) {
        var i = 'el'+id;
        if(data!=null && data!=''){
            var element = ons._util.createElement('<ons-list-item tappable>'
                                                  +'   <div class="left">'
                                                  +'    <ons-radio name="categoryGroup" input-id="r-all" id="'
                                                  + i
                                                  +'"></ons-radio>'
                                                  +'  </div>'
                                                  +'  <label class="center" for="r-all">'
                                                  + data);
            page.querySelector('#custom-category-list').appendChild(element);
            page.querySelector('#'+i).onclick = function(){
                var pendingList = document.querySelector('#pending-list');
                                var a = [];
                                var child = pendingList.children;
                                for (var i = 0; i < child.length; i++) {
                                    a.push(child[i]);
                                }
                                for (var i = 0; i < a.length; i++) {
                                    pendingList.removeChild(a[i]);
                                }
                tabData.forEach((x)=>{
                    if(x.category==data){
                            var checkbox = '<ons-checkbox></ons-checkbox>';
                                  if(x.checked){
                                    checkbox = '<ons-checkbox checked></ons-checkbox>';
                                  }
                            var taskItem = ons.createElement(
                                            //'<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
                                            '<ons-list-item tappable category="' + x.category + '">' +
                                            '<label class="left">' +
                                            checkbox +
                                            '</label>' +
                                            '<div class="center">' +
                                            x.title +
                                            '</div>' +
                                            '<div class="right">' +
                                            '<ons-button class="passEnCours">En cours</ons-button>' +
                                            '<ons-button class="passFinie">Finie</ons-button>' +
                                            '<ons-icon class="suppr" style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
                                            '</div>' +
                                            '</ons-list-item>'
                                          );

                                          // Store data within the element.
                                          taskItem.x = x;

                                          var pendingList = document.querySelector('#pending-list');
                                          pendingList.insertBefore(taskItem, taskItem.x.urgent ? pendingList.firstChild : null);

                    }   });
            }
        id++;
    }});

  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  newTaskPage: function(page) {
    var num = 0;
    var tabData = JSON.parse(storage.getItem("data"));
    var tab2 = [];
    tabData.forEach((x) => {
        var cat = x.category;
        if(!tab2.includes(cat)){tab2.push(cat);}
    });
    tab2.forEach(function (data) {
              var s = 'item'+num;
              if(data!=null && data!=''){
                    page.querySelector('#list-item').appendChild(ons._util.createElement('<ons-list-item modifier="longdivider" id="'+s+'"><div class="right"><ons-checkbox>'));
                    page.querySelector('#'+s).appendChild(document.createTextNode(''+data));
                    num++;
              }
    });
    // Set button functionality to save a new task.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-task"]'), function(element) {
      element.onclick = function() {
        var newTitle = page.querySelector('#title-input').value;
        var tabData = JSON.parse(storage.getItem("data"));
        var newCat = page.querySelector('#category-input').value;
        var check = false;
        var numero = 0;
        var n =0;
        var liste = page.querySelectorAll('ons-checkbox').forEach((x)=>{
            if(x.checked){check=true; numero=n;}
            console.log(n);
            n++;
        });
        if (newTitle) {
          // If input title is not empty, create a new task.
          if(newCat){
            var tab = {
                 title: newTitle,
                 category: newCat,
                 description: page.querySelector('#description-input').value,
                 checked: false,
                 state : "pending"
            };
            var element = ons._util.createElement('<ons-list-item tappable>'
                                                              +'   <div class="left">'
                                                              +'    <ons-radio name="categoryGroup" input-id="r-all"></ons-radio>'
                                                              +'  </div>'
                                                              +'  <label class="center" for="r-all">'
                                                              + newCat);
            document.querySelector('#custom-category-list').appendChild(element);
            element.onclick = function(){
                    var pendingList = document.querySelector('#pending-list');
                            var a = [];
                            var child = pendingList.children;
                            for (var i = 0; i < child.length; i++) {
                                a.push(child[i]);
                            }
                            for (var i = 0; i < a.length; i++) {
                                pendingList.removeChild(a[i]);
                            }
                    var tabData = JSON.parse(storage.getItem("data"));
                    tabData.forEach((data)=>{
                        if(data.category==newCat){
                        var checkbox = '<ons-checkbox></ons-checkbox>';
                              if(data.checked){
                                checkbox = '<ons-checkbox checked></ons-checkbox>';
                              }
                        var taskItem = ons.createElement(
                                        //'<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
                                        '<ons-list-item tappable category="' + data.category + '">' +
                                        '<label class="left">' +
                                        checkbox +
                                        '</label>' +
                                        '<div class="center">' +
                                        data.title +
                                        '</div>' +
                                        '<div class="right">' +
                                        '<ons-button class="passEnCours">En cours</ons-button>' +
                                        '<ons-button class="passFinie">Finie</ons-button>' +
                                        '<ons-icon class="suppr" style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
                                        '</div>' +
                                        '</ons-list-item>'
                                      );

                                      // Store data within the element.
                                      taskItem.data = data;

                                      var pendingList = document.querySelector('#pending-list');
                                      pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);
                    }});


                };
          }else if(check){
             var tab = {
                  title: newTitle,
                  category: tab2[numero],
                  description: page.querySelector('#description-input').value,
                  checked: false,
                  state : "pending"
                  };
          }else{
            ons.notification.alert('Vous devez mettre une catégorie à la tâche');
          }

          tabData.push(tab);
          storage.setItem("data",JSON.stringify(tabData));
          myApp.services.tasks.create(tab);

          // Set selected category to 'All', refresh and pop page.
          document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
          document.querySelector('#myNavigator').popPage();


        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('Vous devez mettre un titre à la tâche');
        }
      };
    });
  }

};
