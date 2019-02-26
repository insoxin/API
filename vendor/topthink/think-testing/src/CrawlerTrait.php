<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2015 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: yunwuxin <448901948@qq.com>
// +----------------------------------------------------------------------
namespace think\testing;

use think\App;
use think\Config;
use think\Cookie;
use think\Error;
use think\Exception;
use think\helper\Arr;
use think\helper\Str;
use think\Request;
use think\Response;

trait CrawlerTrait
{
    use InteractsWithPages;

    protected $currentUri;

    protected $serverVariables = [];

    /** @var  Response */
    protected $response;


    public function get($uri, array $headers = [])
    {
        $server = $this->transformHeadersToServerVars($headers);

        $this->call('GET', $uri, [], [], [], $server);

        return $this;
    }

    public function post($uri, array $data = [], array $headers = [])
    {
        $server = $this->transformHeadersToServerVars($headers);

        $this->call('POST', $uri, $data, [], [], $server);

        return $this;
    }

    public function put($uri, array $data = [], array $headers = [])
    {
        $server = $this->transformHeadersToServerVars($headers);

        $this->call('PUT', $uri, $data, [], [], $server);

        return $this;
    }

    public function delete($uri, array $data = [], array $headers = [])
    {
        $server = $this->transformHeadersToServerVars($headers);

        $this->call('DELETE', $uri, $data, [], [], $server);

        return $this;
    }


    public function call($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        $this->currentUri = $this->prepareUrlForRequest($uri);

        $request = Request::create(
            $this->currentUri, $method, $parameters,
            $cookies, $files, array_replace($this->serverVariables, $server)
        );
        try {
            $response = App::run($request);
        } catch (Exception $e) {
            $response = Error::getExceptionHandler()->render($e);
        } catch (\Throwable $e) {
            $response = Error::getExceptionHandler()->render($e);
        }

        return $this->response = $response;
    }


    public function seeJson($data = null, $negate = false)
    {
        if (is_null($data)) {
            $this->assertJson(
                $this->response->getContent(), "JSON was not returned from [{$this->currentUri}]."
            );

            return $this;
        }

        return $this->seeJsonContains($data, $negate);
    }

    public function seeJsonEquals(array $data)
    {
        $actual = json_encode(Arr::sortRecursive(
            json_decode($this->response->getContent(), true)
        ));

        $this->assertEquals(json_encode(Arr::sortRecursive($data)), $actual);

        return $this;
    }

    protected function seeJsonContains(array $data, $negate = false)
    {
        $method = $negate ? 'assertFalse' : 'assertTrue';

        $actual = json_decode($this->response->getContent(), true);

        if (is_null($actual) || $actual === false) {
            return $this->fail('Invalid JSON was returned from the route. Perhaps an exception was thrown?');
        }

        $actual = json_encode(Arr::sortRecursive(
            (array)$actual
        ));

        foreach (Arr::sortRecursive($data) as $key => $value) {
            $expected = $this->formatToExpectedJson($key, $value);

            $this->{$method}(
                Str::contains($actual, $expected),
                ($negate ? 'Found unexpected' : 'Unable to find') . " JSON fragment [{$expected}] within [{$actual}]."
            );
        }

        return $this;
    }

    /**
     * Format the given key and value into a JSON string for expectation checks.
     *
     * @param  string $key
     * @param  mixed  $value
     * @return string
     */
    protected function formatToExpectedJson($key, $value)
    {
        $expected = json_encode([$key => $value]);

        if (Str::startsWith($expected, '{')) {
            $expected = substr($expected, 1);
        }

        if (Str::endsWith($expected, '}')) {
            $expected = substr($expected, 0, -1);
        }

        return $expected;
    }

    protected function seeModule($module)
    {
        $this->assertEquals($module, request()->module());
        return $this;
    }

    protected function seeController($controller)
    {
        $this->assertEquals($controller, request()->controller());
        return $this;
    }

    protected function seeAction($action)
    {
        $this->assertEquals($action, request()->action());
        return $this;
    }


    protected function seeStatusCode($status)
    {
        $this->assertEquals($status, $this->response->getCode());
        return $this;
    }

    protected function seeHeader($headerName, $value = null)
    {
        $headers = $this->response->getHeader();

        $this->assertTrue(!empty($headers[$headerName]), "Header [{$headerName}] not present on response.");

        if (!is_null($value)) {
            $this->assertEquals(
                $headers[$headerName], $value,
                "Header [{$headerName}] was found, but value [{$headers[$headerName]}] does not match [{$value}]."
            );
        }

        return $this;
    }

    protected function seeCookie($cookieName, $value = null)
    {

        $exist = Cookie::has($cookieName);

        $this->assertTrue($exist, "Cookie [{$cookieName}] not present on response.");

        if (!is_null($value)) {
            $cookie = Cookie::get($cookieName);
            $this->assertEquals(
                $cookie, $value,
                "Cookie [{$cookieName}] was found, but value [{$cookie}] does not match [{$value}]."
            );
        }

        return $this;
    }

    protected function withServerVariables(array $server)
    {
        $this->serverVariables = $server;

        return $this;
    }

    protected function transformHeadersToServerVars(array $headers)
    {
        $server = [];
        $prefix = 'HTTP_';

        foreach ($headers as $name => $value) {
            $name = strtr(strtoupper($name), '-', '_');

            if (!Str::startsWith($name, $prefix) && $name != 'CONTENT_TYPE') {
                $name = $prefix . $name;
            }

            $server[$name] = $value;
        }

        return $server;
    }
}