// wraps html body allowing for insertion of variables
module.exports = res => `
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <!-- Bootstrap CDN -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
  <title>Profile for ${res.userName}</title>
  <!-- set colors -->
  <style>
    body { 
          background-color: ${res.color_bkgd}; 
          -webkit-print-color-adjust: exact !important;
         }
    .card { background-color: ${res.color_card}; }
    img {
          width: 250px;
          height: 250px;
          border-radius: 75%;
        }
  </style>
</head>
<body>
  <!-- Start Nav -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <span class="navbar-brand mb-1 h1">GITHUB generated Portfolio for ${res.userName}</span>
  </nav>
  <!-- End Nav -->
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <div class="page-header">
          <h1>About ${res.userName}</h1>
        </div>
        <div class="row">
          <div class="col-md-3">
            <img src="${res.imageLink}" alt="GITHUB avatar for ${res.userName}" class="img-thumbnail">
          </div>
          <div class="col-md-9">
            <span class="links-nav">
              <a target="_blank" href="https://www.google.com/maps/place/${res.location}" class="nav-link"><i class="fas fa-location-arrow"></i> ${res.location}</a>
              <a target="_blank" href="${res.gitHubProf}" class="nav-link"><i class="fab fa-github-square"></i> GitHub</a>
              <a target="_blank" href="${res.gitHubBlog}" class="nav-link"> <i class="fas fa-rss-square"></i> Blog</a>
            </span>
            <p>
              ${res.bio}
            </p>
          </div>
        </div>
      </div>
      <!--Create Card taking up 4 Columns-->
      <div class="col-md-4">
        <div class="card mt-2">
          <div class="card-body">
            <h5 class="card-title">Public Repos</h5>
            <h6 class="card-subtitle mb-2 text-muted">Number of Public Repos on GITHUB</h6>
            <p class="card-text">${res.numPubRepos}</p>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-body">
            <h5 class="card-title">Followers</h5>
            <h6 class="card-subtitle mb-2 text-muted">Number of Followers on GITHUB</h6>
            <p class="card-text">${res.numFollowers}</p>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-body">
            <h5 class="card-title">Following</h5>
            <h6 class="card-subtitle mb-2 text-muted">Number of Following on GITHUB</h6>
            <p class="card-text">${res.numFollowers}</p>
          </div>
        </div>
        <div class="card mt-2">
          <div class="card-body">
            <h5 class="card-title">Stars</h5>
            <h6 class="card-subtitle mb-2 text-muted">Number of Stars on GITHUB</h6>
            <p class="card-text">${res.numStars}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`