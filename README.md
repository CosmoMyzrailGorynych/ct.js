# This repo is now archived

It is left as a reminder of where it all began, and just in case I need some proofs that ct.js is more than 7 years old.

The new ct.js is at https://github.com/ct-js/ct-js, with the official website at https://ctjs.rocks/. It is a cool 2D game engine and IDE, go try it.

О котэ
=====
ct (читается как «котэ») – модульная библиотека для гибкой разработки любых html5 приложений посредством Javascript. Несмотря на то, что вместе с ct (далее - котэ) можно писать любые приложения, основным направлением в разработке стали браузерные игры, поэтому давайте называть любое приложение на котэ игрой. В данной библиотеке все данные об игре хранятся в самом canvas элементе – так можно парой мелких поправок в коде разместить на одной странице несколько инстанций ct, или же создавать/выгружать их динамически. Таким образом, вся игра заключается в канвасе, который публикуется под переменной ct: 
~~~
> ct 
< <canvas id="ctcanvas"></canvas>
~~~
Такой канвас называется котоканвасом. Все модули, кроме главного `main`, представлены в виде прикреплённых к котоканвасу объектов: 

~~~
> ct.res 
< { Object } 
> ct.types 
< { Object } 
~~~

## Пример
[ct.jump();](http://cosmomyzrailgorynych.github.io/ct/demo/)

Обязательными модулями являются только главный `main` и ресурсный `res`. Кстати, каждый модуль в библиотеке ct тоже называются котами, а чтобы их не путать с самой библиотекой, можно использовать термин «котомод».
## Термины
+ Котоканвас – элемент canvas, хранящий в себе все котомоды и являющийся самим приложением или игрой.
+ Котомод – присоединяемый модуль библиотеки ct.
+ Атлас – это изображение, в котором размещена вся или часть графики игры. Разумеется, вместо атласов можно использовать и отдельные изображения.
+ Спрайт или рабочая графика – фрагмент атласа с подмножеством кадров. Один и тот же спрайт может использоваться как фон, как тайл, как картинка для копий.
+ Тип – образец для создания копий. При изменении типов в ходе игры изменяются и все копии. Также существуют типы фонов и стилей – это тоже образцы, используемые определёнными котомодами.
+ Копия – то, что бегает, прыгает по экрану, стреляет в другие копии, собирает цветочки-копии и т.п.
