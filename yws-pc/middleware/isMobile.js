const isMobile = (context) => {
    context.userAgent = process.server ? context.req.headers["user-agent"] : navigator.userAgent;
    let flag = context.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag) {
        // console.log('移动端');
        context.redirect(302,'http://m.ywshuo.com'+context.route.fullPath)
    }
};

export default isMobile