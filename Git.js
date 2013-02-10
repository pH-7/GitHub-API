/**
 * Title:           GitHub API
 * Description:     GitHub API | jQuery plugin
 *
 * Author:          Pierre-Henry Soria <ph7software@gmail.com>
 * Copyright:       (c) 2013, Pierre-Henry Soria. All Rights Reserved.
 * License:         MIT License (http://opensource.org/licenses/mit-license.php)
 * Link:            http://github.com/pH-7
 */

var Git = {

    // Properties
    sApiUrl: 'https://api.github.com/users/',
    sUsername: '',
    sHtmlGit: $('#git'),
    sHtmlRepos: $('#repos'),
    sHtmlGists: $('#gists'),
    sHtmlBio: $('#bio'),
    iTotalRepos: 0, // Default value
    iTotalGists: 0, // Default value

    // Constructor
    Git: function ()
    {
        oMe = this; // Self Object
        this.sUsername = this.sHtmlGit.data('gituser'), // Get the GitHub Username

        $.getJSON(this.sApiUrl + this.sUsername, function (oData)
        {
            oMe.iTotalRepos = oData.public_repos, oMe.iTotalGists = oData.public_gists;
        }).error(function () {
            oMe.sHtmlGit.append('<div class="warning_block"><p>Oops! An error occurred. Please try again later!</p></div>');
        });


        return this;
    },

    repos: function ()
    {
        var sQueryUrl = oMe.sHtmlRepos.data('queryurl');

        $.getJSON(this.sApiUrl + this.sUsername + '/repos' + sQueryUrl + '&callback=?', function (oData)
        {
            oMe.sHtmlRepos.append('<h3>Total Public Repositories: ' + oMe.iTotalRepos + '</h3>');

            if (oMe.iTotalRepos <1) return false;

            $.each(oData.data, function (i, sVal)
            {
                if (this.private == false)
                {

                    var sFork = this.fork ? ('<span class="forked">Forked</span>') : '';
                    var sOpenIssues = this.open_issues ? ('<span title="Open Issues" aria-hidden="true">' + this.open_issues + '</span>') : '';
                    var sHtml = $('<li>\
                            <h3><a href="' + this.html_url + '">' + this.name + '</a></h3>\
                            ' + sFork + '\
                            <span id="date" title="Pushed At" aria-hidden="true">' + this.pushed_at.slice(0, 10) + '</span>\
                            <div>\
                                <span title="Language" aria-hidden="true">' + (this.language == null ? '...' : this.language) + '</span>\
                                <span title="Watchers" aria-hidden="true">' + this.watchers + '</span>\
                                <span title="Forks" aria-hidden="true">' + this.forks + '</span>\
                                ' + sOpenIssues + '\
                            </div>\
                            <p>\
                                ' + this.description + '\
                            </p>\
                        </li>').hide();

                    oMe.sHtmlRepos.append(sHtml);
                    $(sHtml).fadeIn(450);
                }
            })
        });

        return this;
    },


    gist: function ()
    {
        var sQueryUrl = oMe.sHtmlGists.data('queryurl');

        $.getJSON(this.sApiUrl + this.sUsername + '/gists' + sQueryUrl + '&callback=?', function (oData)
        {
            oMe.sHtmlGists.append('<h3>Total Public Gists: ' + oMe.iTotalGists + '</h3>');

            if (oMe.iTotalGists <1) return false;

            $.each(oData.data, function (i, sVal)
            {
                if (this.public == true)
                {
                    var sDesc = (this.description !== '') ? this.description : '<em>Empty description</em>';
                    var sComments = (this.comments !== 0) ? '<a href="' + this.html_url + '#comments"><span title="Comments"></span></a>' : '';
                    var sHtml = $('<li>\
                            <h3><a href="' + this.html_url + '">gist: ' + this.id + '</a></h3>\
                            <span id="date" title="Created at">' + this.created_at.slice(0, 10) + '</span>\
                            <p>' + sDesc + '</p>\
                            <div>' + sComments + '</div>\
                        </li>').hide();

                    oMe.sHtmlGists.append(sHtml);
                    $(sHtml).fadeIn(450);
                }
            })
        });

        return this;
    },

    bio: function ()
    {
        $.getJSON(this.sApiUrl + this.sUsername, function (oData)
        {
            oMe.sHtmlBio.text(oData.bio);
        });

        return this;
    }

};
