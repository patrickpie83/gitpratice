//隨機設置星星水平位置
const stars = document.querySelectorAll('.star');
stars.forEach((star) => {
    const START_WIDTH = 27;
    const windowWidth = window.innerWidth;
    const starLeftPosition = (Math.random() * windowWidth) - START_WIDTH -15; //再扣除捲軸寬度佔15px，否則會出現水平卷軸
    star.style.left = `${starLeftPosition}px`;
});

//取得所有元素，並依據元素的自訂屬性，設定垂直位置
const moon = document.querySelector('.moon');
const parallaxScrollingElements = [moon, ...stars];
//監聽滾動時的像素值
//HTML 屬性moon的speed自訂為1，到時候乘上scrollPositionY，即與捲軸一起移動

//同步設置stars的垂直位置 -> 為負數，到時候translateY就會為負，translateY為負表示往上移
const setStarMoveSpeed = (star) => {
    const starMoveSpeed = -1 - Math.random(); //星星的starMoveSpeed，設定於-1(含) ~ -2之間感覺會較明顯（每顆都不一樣，因為初始都是水平一致，不一樣才會有高低
    star.dataset.speed = starMoveSpeed; //設定HTML data-speed屬性
};
stars.forEach(setStarMoveSpeed);


window.addEventListener('scroll', () => {
    const scrollPositionY = window.pageYOffset;  //window.pageYOffset垂直方向已滾動的像素值(捲軸高度)
    parallaxScrollingElements.forEach(element=>{
        element.style.transform = `translateY(${ scrollPositionY*(element.dataset.speed) }px)`;   
        //設置垂直位置
        //translateY(像素)。像素為正數，則為「往下移動幾px」
        //若element.dataset.speed為「1」，則「元素往下移動的px同滾動軸移動的px」，看起來在畫面是不動的樣子
        //若element.dataset.speed「小於1」，則「元素往下移動的px 小於 滾動軸移動的px」，元素移動的距離比捲軸多，看起來在畫面往上跑（元素是往下移動，只是比較短）
        //若element.dataset.speed「大於1」，則「元素往下移動的px 大於 滾動軸移動的px」，元素移動的距離比捲軸多，看起來在畫面往下跑（元素是往下移動，距離比滾動軸多）

        //translateY(像素)。像素為負數，則為「往上移動幾px」
    })
});
