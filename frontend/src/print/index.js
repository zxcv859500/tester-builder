const style = { style: `.paper {
    width: 800px;
    height: 1123px;
}
.paper-bound{
    font-family: "나눔스퀘어라운드 ExtraBold";
    font-size: 20px;
    text-align: left;
}
.paper-bound {
    border: 3px solid #dddddd;
    width: 210mm;
    height: 290mm;
    margin: 0 auto 20px;
    position: relative;
    float: top;
}
.paper-head {
    height: 92px;
    overflow: hidden;
    border: 1px solid #333333;
}
.paper-head .logo {
    width: 128px;
    height: 92px;
    float: left;
    color: black;
    background-color: white;
    border-right: 1px solid #333333;
    text-align: center;
}
.paper-head .title {
    margin: 0px 92px 0px 130px;
    height: 92px;
    padding: 0px;
    position: relative;
    white-space: nowrap;
}
.paper-head .qrcode {
    float: right;
    border-left: 1px solid #333;
    width: 92px;
    height: 92px;
}
.id {
    float: right;
    position: relative;
    bottom: 30px;
    font-size: 10pt;
    margin-right: 5px;
}
.title {
    font-family: "나눔스퀘어라운드";
}
.title div.grade {
    font-size: 15px;
    line-height: 26px;
    width: 130px;
    font-family: inherit;
    margin: 5px;
}
.title div.chapter {
    font-size: 24px;
    line-height: 26px;
    font-family: inherit;
}
.title div.chapter2 {
    font-size: 17px;
    line-height: 26px;
    font-family: inherit;
}
.title div.chapter2 small {
    font-size: 12px;
    font-family: inherit;
}
.badge {
    padding: 2px 14px 3px;
    border-radius: 9px;
    font-size: 11px;
    font-weight: bold;
    line-height: 14px;
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.25);
    white-space: nowrap;
    vertical-align: baseline;
    background-color: #999;
    margin-left: 5px;
}
.logo > img {
        position: relative;
        top: 25px;
        margin: auto auto;
    }
`
}

module.exports.style = style;