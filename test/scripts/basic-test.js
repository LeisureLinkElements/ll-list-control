'use strict';
describe('<ll-list-control>', function () {

  var element,
    items,
    textSelector;

  textSelector = "textContent" in document ? "textContent" : "innerText";

  beforeEach(function (done) {
    element = fixture('fixture');
    element.controlTitle = "Associated Items";
    element.emptyListText = "No items to display";
    element.idFieldName = "itemId";
    element.radioButtonGroupName = "group1";
    element.displayFieldSeparator = " - ";
    element.displayFieldNames = ['name', 'type'];

    items = [
      {
        _id: 'aaaaaaaaa',
        itemId: 'aaaaaaaaa',
        name: 'First Item',
        type: 'FLAT',
        description: 'Some item description',
        validFor: [
          {
            start: '2015-11-05T00:00:00.000Z',
            end: null,
            amount: 10,
            lastTouched: [{
              when: '2015-11-05T14:51:47.091Z'
            }]
          }]
      },
      {
        _id: 'bbbbbbbbb',
        itemId: 'bbbbbbbbb',
        name: 'Second Item',
        type: 'FLAT',
        description: 'Another item description',
        validFor: [
          {
            start: '2015-11-05T00:00:00.000Z',
            end: null,
            amount: 10,
            lastTouched: [{
              when: '2015-11-05T14:51:47.091Z'
            }]
          }]
      }
    ];
    element.items = items;

    flush(function(){
      done();
    });
  });

  it('should create a ll-list-control', function (done) {
    expect(element).to.be.ok;
    done();
  });

  it('should contain the correct number of items', function (done) {
    expect(element.items.length).to.be.eql(items.length);
    done();
  });

  it('should validate the first and second item ids', function (done) {
    var itemList = document.getElementsByName('group1');
    expect(itemList).to.be.ok;
    expect(itemList.length).to.be.eql(items.length);
    expect(itemList[0].id).to.be.eql('aaaaaaaaa');
    expect(itemList[1].id).to.be.eql('bbbbbbbbb');
    done();
  });

  it('should validate the first and second display text', function (done) {
    var itemList = document.getElementsByName('itemDisplay');
    expect(itemList).to.be.ok;
    expect(itemList.length).to.be.eql(items.length);
    //expect(itemList[0]).to.be.eql('');
    expect(itemList[0][textSelector]).to.be.eql('First Item - FLAT');
    done();
  });

  it('should validate the control title', function (done) {
    var item = document.getElementsByName('controlTitle');
    expect(item).to.be.ok;
    expect(item[0][textSelector]).to.be.eql(element.controlTitle);
    done();
  });

  it('should validate the text of the Empty List', function (done) {
    var item = document.getElementsByName('listEmpty');
    expect(item).to.be.ok;
    expect(item[0][textSelector]).to.be.eql(element.emptyListText + ' Add one now >');
    done();
  });

  it('should hear the create new event', function (done) {
    element.addEventListener('create-new', function (e) {
      expect(e.detail.item).to.be.eql(undefined);
      done();
    });
    var btn = element.querySelectorAll('#addNewButton');
    expect(btn).to.be.ok;
    btn[0].click();
  });

  it('should hear the associate items event', function (done) {
    element.addEventListener('associate-items', function (e) {
      expect(e.detail.item).to.be.eql(undefined);
      done();
    });
    var btn = element.querySelectorAll('#addItemButton');
    expect(btn).to.be.ok;
    btn[0].click();
  });

  it('should select an item and hear the remove item event', function (done) {
    element.addEventListener('remove-selected', function (e) {
      expect(e).to.be.ok;
      expect(e.detail).to.be.ok;
      expect(e.detail.selectedItemId).to.be.ok;
      expect(e.detail.selectedItemId).to.be.eql('aaaaaaaaa');
      done();
    });
    var option = element.querySelectorAll('#aaaaaaaaa');
    expect(option).to.be.ok;
    expect(option.length).to.be.eql(1);
    option[0].click();

    var btn = element.querySelectorAll('#removeItemButton');
    expect(btn).to.be.ok;
    expect(btn[0].style.display).to.be.eql('block');
    btn[0].click();
  });

});


