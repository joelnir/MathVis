// Generated by CoffeeScript 2.2.1
(function() {
  var closeOptions, edge_options, movie, movie_elem, node_options, recMessage, sendMessage, setProperties, showEdgeOption, showNodeOption, showPathResult;

  movie_elem = $("#movie");

  node_options = $("#node_menu");

  edge_options = $("#edge_menu");

  //Add BonsaiJS to movie
  movie = bonsai.setup({
    runnerContext: bonsai.IframeRunnerContext
  }).run(document.getElementById("movie"), {
    url: "graph_movie.js",
    width: movie_elem.width(),
    height: movie_elem.height()
  });

  showNodeOption = function(x, y) {
    edge_options.css("display", "none");
    node_options.css("display", "block");
    node_options.css("top", y);
    return node_options.css("left", x);
  };

  closeOptions = function() {
    node_options.css("display", "none");
    return edge_options.css("display", "none");
  };

  showEdgeOption = function(x, y) {
    node_options.css("display", "none");
    edge_options.css("display", "block");
    edge_options.css("top", y);
    return edge_options.css("left", x);
  };

  setProperties = function(props) {
    $("#vertice_c").text(props["nodeC"]);
    $("#edge_c").html(props["edgeC"]);
    return $("#total_cost").html(props["costTot"]);
  };

  showPathResult = function(cost) {
    return $("#path_length").html(cost);
  };

  //Send message to movie
  sendMessage = function(action, data = 0) {
    return movie.sendMessage("action", {
      action: action,
      data: data
    });
  };

  // Menu option clicked
  $("#rem_node").click(function() {
    return sendMessage("removeNode");
  });

  $("#new_edge").click(function() {
    return sendMessage("makeEdge");
  });

  $("#rem_edge").click(function() {
    return sendMessage("removeEdge");
  });

  $("#set_weight").click(function() {
    var newWeight, weightNumber;
    //Ask user for Weight
    newWeight = prompt("Set weight");
    if (isNaN(newWeight)) {
      return alert("Not a number!");
    } else {
      weightNumber = parseFloat(newWeight);
      if (weightNumber < 0) {
        return alert("Weight must be positive!");
      } else {
        return sendMessage("setWeight", weightNumber);
      }
    }
  });

  //Side menu buttons
  $("#clear_btn").click(function() {
    return sendMessage("clearGraph");
  });

  $("#dijkstra").click(function() {
    return sendMessage("startDijkstra");
  });

  //Recieve messages from movie
  recMessage = function(msg) {
    var action, data;
    action = msg.action;
    data = msg.data;
    switch (action) {
      case "updateProperties":
        return setProperties(data);
      case "showNodeOptions":
        return showNodeOption(data.x, data.y);
      case "showEdgeOptions":
        return showEdgeOption(data.x, data.y);
      case "hideOptions":
        return closeOptions();
      case "dijkstraDone":
        return showPathResult(data);
    }
  };

  movie.on("message:action", recMessage);

}).call(this);
