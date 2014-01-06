-module(async2).
-export([start/0]).

%% Fetch a web page, send a response back to the parent
fetch(C, Parent, Url) ->
    Start = now(),
    {ok, _Result} = httpc:request(Url),
    Elapsed = timer:now_diff(now(), Start) / 1000 / 1000,
    io:format("~s (~.2f)~n", [Url, Elapsed]),
    Parent ! {C, {ok, Url, Elapsed}}.

%% Run the program
start() ->
    error_logger:tty(false),
    inets:start(),
    ssl:start(),
    Parent = self(),
    Urls = [
        "https://www.amherst.edu",
        "http://www.google.com",
        "https://lms.ats.amherst.edu",
        "http://aws.amazon.com",
        "https://acdc.amherst.edu",
        "https://acdc.amherst.edu:9443"],
    Count = lists:foldl(
                fun(Url, C) -> 
                    spawn(fun() -> fetch(C, Parent, Url) end),
                    C+1
                end,
                0,
                Urls),
    gather(0, Count).

%% Collect the responses
gather(C, C) ->
    ssl:stop(),
    inets:stop(),
    [];
gather(C, Count) ->
    receive
        {C, Ret} -> [{C, Ret}|gather(C+1, Count)]
    end.


