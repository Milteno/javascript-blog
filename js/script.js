'use strict';
/*document.getElementById('test-button').addEventListener('click', function() {
    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);
})*/
const titleClickHandler = function(event){
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
  }



    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

    function generateTitleLinks(){

        /* remove contents of titleList */
        const listTitles = document.querySelector('.titles');
        const linksContent = document.querySelectorAll('.titles span');
        let html = '';

        for(let span of linksContent){
          span.innerHTML=" ";
        }

        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);

        for(let article of articles){
            const articleId = article.getAttribute('id');
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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
        console.log(links);

        for(let link of links){
            link.addEventListener('click', titleClickHandler);
        }
        }
    generateTitleLinks();


