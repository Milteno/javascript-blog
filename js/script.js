'use strict';
/*document.getElementById('test-button').addEventListener('click', function() {
    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);
})*/
const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
  }
const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const hrefAttrib = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const findArticle = document.querySelector(hrefAttrib);

    /* add class 'active' to the correct article */
    findArticle.classList.add('active');
};



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list',
    optAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

const generateTitleLinks = function(customSelector = '') {

    /* remove contents of titleList */
    const listTitles = document.querySelector('.titles');
    const linksContent = document.querySelectorAll('.titles span');
    let html = '';

    for (let span of linksContent) {
        span.innerHTML=' ';
    }

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        const linkHTMLData = {id: articleId, title: articleTitle};
        const linkHTML = templates.articleLink(linkHTMLData);
        //console.log(linkHTML);
        //listTitles.insertAdjacentHTML("beforebegin", linkHTML);
        html = html + linkHTML;
    }
    listTitles.innerHTML = html;
    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
};
generateTitleLinks();
const calculateTagsParams = function(tags) {
    const params = {max: 0, min: 999999};
    for (let tag in tags) {
        console.log(tag + ' is used ' + tags[tag] + ' times');
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
    }
    return params;
};
const calculateTagClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
};
const generateTags = function() {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    let allTags = {};
    /* START LOOP: for every article: */
    for (let article of articles) {
    /* find tags wrapper */
        const listTitles = article.querySelector(optArticleTagsSelector);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const articleTags = article.getAttribute('data-tags');
        /* split tags into array */
        const articleTagsArray = articleTags.split(' ');
        /* START LOOP: for each tag */
        for (let tag of articleTagsArray) {
        /* generate HTML of the link */
            const linkHTMLData = {tag: tag}
            const genHTML = templates.tagLink(linkHTMLData);
            /* add generated code to html variable */
            html = html + genHTML;
            /* END LOOP: for each tag */
            if (!allTags[tag]) {
                /* [NEW] add generated code to allTags array */
                allTags[tag] = 1;
            }
            else {
                allTags[tag]++;
            }
        }
        /* insert HTML of all the links into the tags wrapper */
        listTitles.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] add html from allTags to tagList */
    //tagList.innerHTML = allTags.join(' ');
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    const allTagsData = {tags: []};
    for (let tag in allTags) {
        const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-'+ tag +'">' + tag + '</a></li>';
        allTagsData.tags.push({
            tag: tag,
            count: allTags[tag],
            className: calculateTagClass(allTags[tag], tagsParams)
          });

    }
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
};

generateTags();

const tagClickHandler = function(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedEelement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedEelement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */

    for (let activeTagLink of activeTagLinks) {
        activeTagLink.classList.remove('active');
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */

    for (let tagLink of tagLinks) {

        /* add class active */

        tagLink.classList.add('active');

        /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
};
const addClickListenersToTags = function() {
    /* find all links to tags */

    const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */

    for (let tagsLink of tagsLinks) {

        /* add tagClickHandler as event listener for that link */

        tagsLink.addEventListener('click', tagClickHandler);

        /* END LOOP: for each link */
    }
};
addClickListenersToTags();

const generateAuthors = function() {
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
        const authorName = article.getAttribute('data-author');
        let html = '';
        const postAuthor = article.querySelector(optAuthorSelector);
        console.log(postAuthor);
        const linkHtmlData = {author: authorName};
        html = templates.authorLink(linkHtmlData);
        postAuthor.innerHTML = html;
        console.log(html);
    }
};
generateAuthors();
const addClickListenersToAuthors = function() {
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for (let authorLink of authorLinks) {
        authorLink.addEventListener('click', authorClickHandler);
    }
};
const authorClickHandler = function(event) {
    event.preventDefault();
    const clickedEelement = this;
    const href = clickedEelement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeTagLink of activeAuthorLinks) {
        activeTagLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (let authorLink of authorLinks) {
        authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
};
const generateAuthorsList = function() {
    const articles = document.querySelectorAll(optArticleSelector);
    const authors = {};
    const allTagsData = {authors: []};
    for (let article of articles) {
        const authorName = article.getAttribute('data-author');
        if (!authors[authorName]) {
            authors[authorName] = 1;
        }
        else {
            authors[authorName] += 1;
        }
    }
    for (let author in authors) {
        console.log(author);
        allTagsData.authors.push({
            author:author,
            count: authors[author]
          });
    }
    const optAuthorsListSelector = '.list.authors';
    console.log(allTagsData);
    document.querySelector(optAuthorsListSelector).innerHTML = templates.authorCloudLink(allTagsData);
};
generateAuthorsList();
addClickListenersToAuthors();