Template.sulaSearch.events({
    'submit #search-sula': function (event, template) {
        event.preventDefault();

        var query = $('#search').val().trim();

        if (query !== '') {
            Router.go('search', {q: query});
        }
    }
});
