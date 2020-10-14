<html lang="zh">
<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/home.css"/>
    <link rel="stylesheet" href="/public/js/home.css"/>
</head>
<body>
    <ul class="news-view view">
        {% for item in list %}
        <li class="item">
            <span>{{helper.relativeTime(item.time)}}</span>
            <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
        {% endfor %}
    </ul>
</body>
</html>