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

run(F) ->
    error_logger:tty(false),
    inets:start(),
    ssl:start(),
    Urls = [
        "https://www.amherst.edu",
        "https://www.google.com",
        "https://lms.ats.amherst.edu",
        "https://foursquare.com",
        "https://aws.amazon.com",
        "https://acdc.amherst.edu"],
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
