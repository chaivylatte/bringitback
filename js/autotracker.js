if (trackernum===undefined) var trackernum = 0;
else trackernum ++;
{

const scriptelements = document.getElementsByTagName("script");
const Current_Script = scriptelements[scriptelements.length - 1];

function loadJsFile(filename, callback){
    let fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
    if (callback) {
       fileref.onreadystatechange = callback;
       fileref.onload = callback;
    }
    document.head.appendChild(fileref);
}

const startLoadParticipatedTracker = function () {
const Comm_Thread_Wrapper = $("<div class='modalautowrap'></div>");
const Thread_Thread_Wrapper = $("<div class='modalautowrap'></div>");
const Open_Thread_Wrapper = $("<div class='modalautowrap' style='display: none;'></div>");
const Closed_Thread_Wrapper = $("<div class='modalautowrap'></div>");
$(Current_Script).before(Comm_Thread_Wrapper);
$(Current_Script).before(Thread_Thread_Wrapper);
$(Current_Script).before(Open_Thread_Wrapper);
$(Current_Script).before(Closed_Thread_Wrapper);

let trackedcharacter = Character_Name;

Comm_Thread_Wrapper.append(`<div class="modalautohead">comms</div>`);
Thread_Thread_Wrapper.append(`<div class="modalautohead">threads</div>`);
Open_Thread_Wrapper.append(``);
Closed_Thread_Wrapper.append(``);

setTimeout(()=>{ FillParticipatedTracker(trackedcharacter)},Next_Tracker_Delay * 1000 * trackernum);

async function FillParticipatedTracker(username) {
    const thiscomms = $("<div class='modalautosur'></div>");
    const thisthreads = $("<div class='modalautosur'></div>");
    const thistracker = $("<div class='modalautosur'></div>");
    const thishistory = $("<div class='modalautosur'></div>");
    $(Comm_Thread_Wrapper).append(thiscomms);
    $(Thread_Thread_Wrapper).append(thisthreads);
    $(Open_Thread_Wrapper).append(thistracker);
    $(Closed_Thread_Wrapper).append(thishistory);

    let href = `/index.php?act=Search&q=&f=&u=${username.replace("&#160;", "%20").replace("&#39;", "%27")}&rt=topics`;
    let data = '';
    try {
        console.log(`fetching ${href}`);
        data = await $.get(href);
        console.log('success.');
    } catch (err) {
        console.log(`Ajax error loading page: ${href} - ${err.status} ${err.statusText}`);
        thistracker.append('<div class="modalautoitem">Search Failed</div>');
        return;
    }
    let doc = new DOMParser().parseFromString(data, 'text/html');
    
    let meta = $('meta[http-equiv="refresh"]', doc);
    if (meta.length) {
      href = meta.attr('content').substr(meta.attr('content').indexOf('=') + 1);
      try {
        console.log(`fetching ${href}`);
        data = await $.get(href);
        console.log('success.');
      } catch (err) {
        console.log(`Ajax error loading page: ${href} - ${err.status} ${err.statusText}`);
        thistracker.append('<div class="modalautoitem">Search Failed</div>');
        return;
      }

      doc = new DOMParser().parseFromString(data, 'text/html');
    } else {       
       let boardmessage = $('#board-message .tablefill .postcolor', doc).text();
          thistracker.append(`<div class="modalautoitem">${boardmessage}</div>`);

          return;
    }

    $('#search-topics .tablebasic > tbody > tr', doc).each(function (i, e) {
        if (i > 0) {
            let cells = $(e).children('td');
            const location = $(cells[3]).text();
            if (!Ignore_Forums.includes(location)) {
                const locked = $(cells[3]).find(Locked_Thread_Definition).text();
                const comms = $(cells[3]).find(Comm_Thread_Definition).text();
                const actthreads = $(cells[3]).find(Thread_Thread_Definition).text();
                const title = $(cells[2]).find('td:nth-child(2) > a').text();
                const threadDesc = $(cells[2]).find('.desc').text();
                const location = $(cells[3]).text();
              
                const href = $(cells[7]).children('a').attr('href');
                const threadID = href.match(/showtopic=([^&]+)&?/)[1];
                const fhref = $(cells[3]).children('a').attr('href');
                const forumID = fhref.match(/showforum=([^&]+)&?/)[1];
                const lastPoster = $(cells[7]).children('b').text();
                if (Previous_Poster[threadID]) {
                    var myturn = (lastPoster.includes(Previous_Poster[threadID]))? 'fa-exclamation-triangle':'fa-check';
                } else {
                    var myturn = (lastPoster.includes(trackedcharacter))? 'fa-check': 'fa-exclamation-triangle';
                }


                let postDate = $(cells[7]).html();
                postDate = postDate.substr(0, postDate.indexOf('<br>'));
                if (locked) {
                    thishistory.append($(`<div class="modalautoitem"><div class="modaliconbar"><span class="status fas ${myturn}"></span><span><a href="?act=Post&CODE=02&f=${forumID}&t=${threadID}&st=0" class="fas fa-reply" title="reply to this"></a></span></div><div class="modalautoright"><div class="modalthreadtitle"><a href="${href}">${title}</a></div><div class="modalautodesc" isEmpty="${threadDesc}">${threadDesc}</div></div></div>`));
                } else if (comms) {
                    thiscomms.append($(`<div class="modalautoitem"><div class="modaliconbar"><span class="status fas ${myturn}"></span><span><a href="?act=Post&CODE=02&f=${forumID}&t=${threadID}&st=0" class="fas fa-reply" title="reply to this"></a></span></div><div class="modalautoright"><div class="modalthreadtitle"><a href="${href}">${title}</a></div><div class="modalautodesc" isEmpty="${threadDesc}">${threadDesc}</div><div class="modalautolp"><span>${lastPoster}</span> - ${postDate}</div></div></div>`));
                } else if (actthreads) {
                    thisthreads.append($(`<div class="modalautoitem"><div class="modaliconbar"><span class="status fas ${myturn}"></span><span><a href="?act=Post&CODE=02&f=${forumID}&t=${threadID}&st=0" class="fas fa-reply" title="reply to this"></a></span></div><div class="modalautoright"><div class="modalthreadtitle"><a href="${href}">${title}</a></div><div class="modalautodesc" isEmpty="${threadDesc}">${threadDesc}</div><div class="modalautolp"><span>${lastPoster}</span> - ${postDate}</div></div></div>`));
                }  else {
                    thistracker.append($(`<div class="modalautoitem"><div class="modaliconbar"><span class="status fas ${myturn}"></span><span><a href="?act=Post&CODE=02&f=${forumID}&t=${threadID}&st=0" class="fas fa-reply" title="reply to this"></a></span></div><div class="modalautoright"><div class="modalthreadtitle"><a href="${href}">${title}</a></div><div class="modalautodesc" isEmpty="${threadDesc}">${threadDesc}</div><div class="modalautolp"><span>${lastPoster}</span> - ${postDate}</div></div></div>`));
                }
            }
        }

    });
   if (!thiscomms.children()) {
        thiscomms.append('<div class="modalautoitem">none</div>');
   }
   if (!thisthreads.children()) {
        thisthreads.append('<div class="modalautoitem">none</div>');
   }
   if (!thistracker.children()) {
        thistracker.append('<div class="modalautoitem">none</div>');
   }
   if (!thishistory.children()) {
        thishistory.append('<div class="modalautoitem">none</div>');
   }

}

}

if (window.jQuery) startLoadParticipatedTracker();
else loadJsFile('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js', startLoadParticipatedTracker);

}