-module(async).
-export([map/0, pmap/0]).

fetch(Url) ->
    Start = now(),
    {ok, _R} = httpc:request(Url),
    Elapsed = timer:now_diff(now(), Start) / 1000 / 1000,
    io:format("~s (~.2f)~n", [Url, Elapsed]),
    {ok, Url, Elapsed}.


pmap(F, L) ->
    Parent = self(),
    [receive {Pid, Result} -> Result end
        || Pid <- [spawn(fun() -> Parent ! {self(), F(X)} end)
            || X <- L]].

init() ->
    error_logger:tty(false),
    inets:start(),
    ssl:start(),
    ["https://www.amherst.edu",
     "http://www.google.com",
     "https://lms.ats.amherst.edu",
     "http://aws.amazon.com",
     "https://acdc.amherst.edu",
     "https://acdc.amherst.edu:9443"].

run(F) ->
    Urls = init(),
    Start = now(),
    Results = F(fun fetch/1, Urls),
    io:format("Elapsed: ~.2f~n",
        [timer:now_diff(now(), Start) / 1000 / 1000]),
    ssl:stop(),
    inets:stop(),
    Results.
     

map() ->
    run(fun lists:map/2).

pmap() ->
    run(fun pmap/2).
