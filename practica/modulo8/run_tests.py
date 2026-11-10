"""
Runner maestro de pruebas automatizadas con la biblioteca estándar `unittest` de Python.
Ejecuta tanto los 9 casos de aceptación de negocio como las 7 pruebas de integración de API.
"""

import sys
import os
import unittest

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from tests.test_acceptance import TestAcceptanceSuite
from tests.test_api_integration import TestApiIntegration

def run_all_tests():
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    suite.addTests(loader.loadTestsFromTestCase(TestAcceptanceSuite))
    suite.addTests(loader.loadTestsFromTestCase(TestApiIntegration))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    return 0 if result.wasSuccessful() else 1

if __name__ == "__main__":
    sys.exit(run_all_tests())
